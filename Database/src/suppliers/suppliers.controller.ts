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
import { SuppliersService } from './suppliers.service';
import {
  CreateSupplierDto,
  CreateSupplierValidator,
  UpdateSupplierDto,
  UpdateSupplierValidator,
} from './supplierDto';
import { Supplier } from '@prisma/client';
import { fromZodError } from 'zod-validation-error';
import { UsersService } from '../users/users.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll(): Promise<Supplier[]> {
    return await this.suppliersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Supplier> {
    const idNumber = Number(id);
    if (isNaN(idNumber))
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );

    const existedSupplier = await this.suppliersService.findOne(idNumber);
    if (existedSupplier) return existedSupplier;

    throw new NotFoundException('Provided ID not found');
  }

  @Post()
  async create(@Body() createDto: CreateSupplierDto): Promise<Supplier> {
    const parsedDto = CreateSupplierValidator.safeParse(createDto);
    if (!parsedDto.success)
      throw new BadRequestException(fromZodError(parsedDto.error).message);

    const existedUser = await this.usersService.findOne(createDto.userId);
    if (!existedUser)
      throw new BadRequestException('Provided user ID is not existed');

    const existedSuppliers = await this.suppliersService.findByUserId(
      createDto.userId,
    );
    const existedSupplier = existedSuppliers.find(
      (supplier) => supplier.companyName === createDto.companyName,
    );
    if (existedSupplier)
      throw new BadRequestException('Provided company name is already existed');

    return await this.suppliersService.create(createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    const parsedDto = UpdateSupplierValidator.safeParse(updateDto);
    if (!parsedDto.success)
      throw new BadRequestException(fromZodError(parsedDto.error).message);

    const idNumber = Number(id);
    if (isNaN(idNumber))
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );

    const existedSupplier = await this.suppliersService.findOne(idNumber);
    if (!existedSupplier) throw new NotFoundException('Provided ID not found');

    return await this.suppliersService.update(idNumber, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Supplier> {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );
    }

    const existedSupplier = await this.suppliersService.findOne(idNumber);
    if (existedSupplier) return this.suppliersService.remove(idNumber);

    throw new NotFoundException('Provided ID not found');
  }
}
