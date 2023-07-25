import { randomValues } from '@aws-crypto/random-source-node';
import { Sha256 } from '@aws-crypto/sha256-js';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  AuthUserDto,
  CreateUserDto,
  CreateUserValidator,
  UpdateUser,
  CreateUser,
  UpdateUserDto,
  UpdateUserValidator,
} from './userDto';
import { fromZodError } from 'zod-validation-error';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const existedUser = await this.usersService.findOne(id);
    if (existedUser) return existedUser;

    throw new NotFoundException('Provided ID not found');
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const parsedDto = CreateUserValidator.safeParse(createUserDto);
    if (!parsedDto.success)
      throw new BadRequestException(fromZodError(parsedDto.error).message);

    const existedUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existedUser)
      throw new BadRequestException('Provided email is already existed');

    const { hashedPassword, individualSalt } = await this.getHashedPassword(
      createUserDto.password,
    );

    const saveUser: CreateUser = {
      email: createUserDto.email,
      name: createUserDto.name,
      passwordHash: hashedPassword,
      passwordSalt: individualSalt,
    };

    console.log(saveUser);

    return this.usersService.create(saveUser);
  }

  @Post('auth')
  async authenticate(@Body() authUserDto: AuthUserDto) {
    const existedUser = await this.usersService.findByEmail(authUserDto.email);
    if (!existedUser)
      throw new BadRequestException(
        'Provided email or password is not existed',
      );

    const { hashedPassword } = await this.getHashedPasswordWithSalt(
      authUserDto.password,
      existedUser.passwordSalt,
    );

    if (existedUser.passwordHash !== hashedPassword)
      throw new BadRequestException(
        'Provided email or password is not correct',
      );

    return existedUser.id;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const parsedDto = UpdateUserValidator.safeParse(updateUserDto);
    if (!parsedDto.success)
      throw new BadRequestException(fromZodError(parsedDto.error).message);

    const existedUser = await this.usersService.findOne(id);
    if (!existedUser) throw new BadRequestException('Provided user not exists');

    if (updateUserDto.email) {
      const existedUserByEmail = await this.usersService.findByEmail(
        updateUserDto.email,
      );
      if (existedUserByEmail && existedUserByEmail.id !== existedUser.id)
        throw new BadRequestException('Provided email is already existed');
    }

    if (updateUserDto.password) {
      const { hashedPassword, individualSalt } = await this.getHashedPassword(
        updateUserDto.password,
      );
      const saveUpdateUserDto: UpdateUser = {
        email: updateUserDto.email,
        name: updateUserDto.name,
        passwordHash: hashedPassword,
        passwordSalt: individualSalt,
      };
      return await this.usersService.update(id, saveUpdateUserDto);
    } else {
      const saveUpdateUserDto: UpdateUser = {
        email: updateUserDto.email,
        name: updateUserDto.name,
      };
      return await this.usersService.update(id, saveUpdateUserDto);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const existedUser = await this.usersService.findOne(id);
    if (existedUser) return this.usersService.remove(id);

    throw new NotFoundException('Provided ID not found');
  }

  private async getHashedPassword(password: string) {
    const individualSalt = (await randomValues(16)).toString();
    const commonPepper = this.configService.get('PASSWORD_COMMON_PEPPER');
    const shaKey = this.configService.get('PASSWORD_SHA_KEY');
    const hash = new Sha256(shaKey);
    hash.update(individualSalt + password + commonPepper);
    const hashedPassword = (await hash.digest()).toString();
    return { hashedPassword, individualSalt };
  }

  private async getHashedPasswordWithSalt(
    password: string,
    individualSalt: string,
  ) {
    const commonPepper = this.configService.get('PASSWORD_COMMON_PEPPER');
    const shaKey = this.configService.get('PASSWORD_SHA_KEY');
    const hash = new Sha256(shaKey);
    hash.update(individualSalt + password + commonPepper);
    const hashedPassword = (await hash.digest()).toString();
    return { hashedPassword, individualSalt };
  }
}
