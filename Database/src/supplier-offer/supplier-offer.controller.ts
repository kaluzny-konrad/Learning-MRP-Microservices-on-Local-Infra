import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupplierOfferService } from './supplier-offer.service';
import {
  CreateSupplierOfferDto,
  UpdateSupplierOfferDto,
} from './supplierOfferDto';

@Controller('supplier-offer')
export class SupplierOfferController {
  constructor(private readonly supplierOfferService: SupplierOfferService) {}

  @Post()
  create(@Body() createSupplierOfferDto: CreateSupplierOfferDto) {
    return this.supplierOfferService.create(createSupplierOfferDto);
  }

  @Get()
  findAll() {
    return this.supplierOfferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierOfferService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierOfferDto: UpdateSupplierOfferDto,
  ) {
    return this.supplierOfferService.update(+id, updateSupplierOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierOfferService.remove(+id);
  }
}
