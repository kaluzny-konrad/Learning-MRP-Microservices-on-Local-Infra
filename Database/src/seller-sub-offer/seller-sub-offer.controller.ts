import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SellerSubOfferService } from './seller-sub-offer.service';
import {
  CreateSellerSubOfferDto,
  UpdateSellerSubOfferDto,
} from './sellerSubOfferDto';

@Controller('seller-sub-offer')
export class SellerSubOfferController {
  constructor(private readonly sellerSubOfferService: SellerSubOfferService) {}

  @Post()
  create(@Body() createSellerSubOfferDto: CreateSellerSubOfferDto) {
    return this.sellerSubOfferService.create(createSellerSubOfferDto);
  }

  @Get()
  findAll() {
    return this.sellerSubOfferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerSubOfferService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSellerSubOfferDto: UpdateSellerSubOfferDto,
  ) {
    return this.sellerSubOfferService.update(+id, updateSellerSubOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerSubOfferService.remove(+id);
  }
}
