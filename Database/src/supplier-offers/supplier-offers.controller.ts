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
import { SupplierOffersService } from './supplier-offers.service';
import {
  CreateSupplierOfferDto,
  CreateSupplierOfferValidator,
  UpdateSupplierOfferDto,
  UpdateSupplierOfferValidator,
} from './supplierOfferDto';
import { SupplierOffer } from '@prisma/client';
import { fromZodError } from 'zod-validation-error';

@Controller('supplier-offers')
export class SupplierOffersController {
  constructor(private readonly supplierOffersService: SupplierOffersService) {}

  @Get()
  async findAll(): Promise<SupplierOffer[]> {
    return await this.supplierOffersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SupplierOffer> {
    const idNumber = Number(id);
    if (isNaN(idNumber))
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );

    const existedSupplierOffer = await this.supplierOffersService.findOne(
      idNumber,
    );
    if (existedSupplierOffer) return existedSupplierOffer;

    throw new NotFoundException('Provided ID not found');
  }

  @Post()
  async create(
    @Body() createDto: CreateSupplierOfferDto,
  ): Promise<SupplierOffer> {
    const parsedDto = CreateSupplierOfferValidator.safeParse(createDto);
    if (!parsedDto.success)
      throw new BadRequestException(fromZodError(parsedDto.error).message);

    return await this.supplierOffersService.create(createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSupplierOfferDto,
  ): Promise<SupplierOffer> {
    const parsedDto = UpdateSupplierOfferValidator.safeParse(updateDto);
    if (!parsedDto.success)
      throw new BadRequestException(fromZodError(parsedDto.error).message);

    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );
    }

    const existedSupplierOffer = await this.supplierOffersService.findOne(
      idNumber,
    );
    if (existedSupplierOffer) {
      existedSupplierOffer.updatedAt = new Date();
      return await this.supplierOffersService.update(idNumber, updateDto);
    }

    throw new NotFoundException('Provided ID not found');
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SupplierOffer> {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );
    }

    const existedSupplierOffer = await this.supplierOffersService.findOne(
      idNumber,
    );
    if (existedSupplierOffer)
      return this.supplierOffersService.remove(idNumber);

    throw new NotFoundException('Provided ID not found');
  }
}
