import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SellerOffersService } from './seller-offers.service';
import {
  CreateSellerOfferDto,
  CreateSellerOfferValidator,
  UpdateSellerOfferDto,
  UpdateSellerOfferValidator,
} from './sellerOfferDto';
import { SellerOffer } from '@prisma/client';
import { fromZodError } from 'zod-validation-error';

@Controller('seller-offers')
export class SellerOffersController {
  constructor(private readonly sellerOffersService: SellerOffersService) {}

  @Get()
  async findAll(): Promise<SellerOffer[]> {
    return await this.sellerOffersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SellerOffer> {
    const idNumber = Number(id);
    if (isNaN(idNumber))
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );

    const existedSellerOffer = await this.sellerOffersService.findOne(idNumber);
    if (existedSellerOffer) return existedSellerOffer;

    throw new NotFoundException('Provided ID not found');
  }

  @Post()
  async create(@Body() createDto: CreateSellerOfferDto): Promise<SellerOffer> {
    const parsedDto = CreateSellerOfferValidator.safeParse(createDto);
    if (!parsedDto.success)
      throw new BadRequestException(fromZodError(parsedDto.error).message);

    return await this.sellerOffersService.create(createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSellerOfferDto,
  ): Promise<SellerOffer> {
    const parsedDto = UpdateSellerOfferValidator.safeParse(updateDto);
    if (!parsedDto.success)
      throw new BadRequestException(fromZodError(parsedDto.error).message);

    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );
    }

    const existedSellerOffer = await this.sellerOffersService.findOne(idNumber);
    if (existedSellerOffer) {
      existedSellerOffer.updatedAt = new Date();
      return await this.sellerOffersService.update(idNumber, updateDto);
    }

    throw new NotFoundException('Provided ID not found');
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SellerOffer> {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );
    }

    const existedSellerOffer = await this.sellerOffersService.findOne(idNumber);
    if (existedSellerOffer) return this.sellerOffersService.remove(idNumber);

    throw new NotFoundException('Provided ID not found');
  }
}
