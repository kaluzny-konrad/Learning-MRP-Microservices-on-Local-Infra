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
import { UserService } from './user.service';
import {
  AuthUserDto,
  CreateUserDto,
  CreateUserValidator,
  SaveUpdateUserDto,
  SaveUserDto,
  UpdateUserDto,
  UpdateUserValidator,
} from './userDto';
import { fromZodError } from 'zod-validation-error';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const idNumber = Number(id);
    if (isNaN(idNumber))
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );

    const existedUser = await this.userService.findOne(idNumber);
    if (existedUser) return existedUser;

    throw new NotFoundException('Provided ID not found');
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const parsedDto = CreateUserValidator.safeParse(createUserDto);
    if (!parsedDto.success)
      throw new BadRequestException(fromZodError(parsedDto.error).message);

    const existedUser = await this.userService.findByEmail(createUserDto.email);
    if (existedUser)
      throw new BadRequestException('Provided email is already existed');

    const { hashedPassword, individualSalt } = await this.getHashedPassword(
      createUserDto.password,
    );

    const saveUserDto: SaveUserDto = {
      email: createUserDto.email,
      name: createUserDto.name,
      passwordHash: hashedPassword,
      passwordSalt: individualSalt,
    };

    console.log(saveUserDto);

    return this.userService.create(saveUserDto);
  }

  @Post('auth')
  async authenticate(@Body() authUserDto: AuthUserDto) {
    const existedUser = await this.userService.findByEmail(authUserDto.email);
    if (!existedUser)
      throw new BadRequestException('Provided email is not existed');

    const { hashedPassword } = await this.getHashedPasswordWithSalt(
      authUserDto.password,
      existedUser.passwordSalt,
    );

    if (existedUser.passwordHash !== hashedPassword)
      throw new BadRequestException('Provided password is not correct');

    return existedUser.id;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const parsedDto = UpdateUserValidator.safeParse(updateUserDto);
    if (!parsedDto.success)
      throw new BadRequestException(fromZodError(parsedDto.error).message);

    const idNumber = Number(id);
    if (isNaN(idNumber))
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );

    const existedUser = await this.userService.findOne(idNumber);
    if (!existedUser) throw new BadRequestException('Provided user not exists');

    if (updateUserDto.password) {
      const { hashedPassword, individualSalt } = await this.getHashedPassword(
        updateUserDto.password,
      );
      const saveUpdateUserDto: SaveUpdateUserDto = {
        email: updateUserDto.email,
        name: updateUserDto.name,
        passwordHash: hashedPassword,
        passwordSalt: individualSalt,
      };
      return await this.userService.update(+id, saveUpdateUserDto);
    } else {
      const saveUpdateUserDto: SaveUpdateUserDto = {
        email: updateUserDto.email,
        name: updateUserDto.name,
      };
      return await this.userService.update(+id, saveUpdateUserDto);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );
    }

    const existedUser = await this.userService.findOne(idNumber);
    if (existedUser) return this.userService.remove(idNumber);

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
