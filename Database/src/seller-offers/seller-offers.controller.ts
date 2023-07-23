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
import { CreateSellerOfferDto } from './dto/create-seller-offer.dto';
import { UpdateSellerOfferDto } from './dto/update-seller-offer.dto';
import { SellerOffer } from '@prisma/client';

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
    if (isNaN(idNumber)) {
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );
    }

    const existedSellerOffer = await this.sellerOffersService.findOne(idNumber);
    if (existedSellerOffer) {
      return existedSellerOffer;
    }

    throw new NotFoundException('Seller Offer not found');
  }

  @Post()
  async create(@Body() createDto: CreateSellerOfferDto): Promise<SellerOffer> {
    if (!createDto.sellerId) {
      throw new BadRequestException('Seller ID is required');
    }
    return await this.sellerOffersService.create(createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSellerOfferDto,
  ): Promise<SellerOffer> {
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
    } else {
      throw new NotFoundException('Seller Offer not found');
    }
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
    if (existedSellerOffer) {
      return this.sellerOffersService.remove(idNumber);
    } else {
      throw new NotFoundException('Seller Offer not found');
    }
  }
}
