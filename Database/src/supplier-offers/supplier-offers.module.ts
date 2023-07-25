import { Module } from '@nestjs/common';
import { SupplierOffersService } from './supplier-offers.service';
import { SupplierOffersController } from './supplier-offers.controller';

@Module({
  controllers: [SupplierOffersController],
  providers: [SupplierOffersService],
})
export class SupplierOffersModule {}
