import { Module } from '@nestjs/common';
import { SellerSubOfferService } from './seller-sub-offer.service';
import { SellerSubOfferController } from './seller-sub-offer.controller';

@Module({
  controllers: [SellerSubOfferController],
  providers: [SellerSubOfferService],
})
export class SellerSubOfferModule {}
