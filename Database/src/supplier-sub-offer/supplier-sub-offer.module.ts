import { Module } from '@nestjs/common';
import { SupplierSubOfferService } from './supplier-sub-offer.service';
import { SupplierSubOfferController } from './supplier-sub-offer.controller';

@Module({
  controllers: [SupplierSubOfferController],
  providers: [SupplierSubOfferService],
})
export class SupplierSubOfferModule {}
