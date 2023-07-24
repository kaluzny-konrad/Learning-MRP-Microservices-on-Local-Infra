import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupplierSubOfferService } from './supplier-sub-offer.service';
import {
  CreateSupplierSubOfferDto,
  UpdateSupplierSubOfferDto,
} from './supplierSubOfferDto';

@Controller('supplier-sub-offer')
export class SupplierSubOfferController {
  constructor(
    private readonly supplierSubOfferService: SupplierSubOfferService,
  ) {}

  @Post()
  create(@Body() createSupplierSubOfferDto: CreateSupplierSubOfferDto) {
    return this.supplierSubOfferService.create(createSupplierSubOfferDto);
  }

  @Get()
  findAll() {
    return this.supplierSubOfferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierSubOfferService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierSubOfferDto: UpdateSupplierSubOfferDto,
  ) {
    return this.supplierSubOfferService.update(+id, updateSupplierSubOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierSubOfferService.remove(+id);
  }
}
