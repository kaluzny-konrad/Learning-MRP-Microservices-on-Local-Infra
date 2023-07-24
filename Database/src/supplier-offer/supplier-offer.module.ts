import { Module } from '@nestjs/common';
import { SupplierOfferService } from './supplier-offer.service';
import { SupplierOfferController } from './supplier-offer.controller';

@Module({
  controllers: [SupplierOfferController],
  providers: [SupplierOfferService],
})
export class SupplierOfferModule {}
