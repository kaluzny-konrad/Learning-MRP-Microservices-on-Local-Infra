import { Module } from '@nestjs/common';
import { SellerOffersService } from './seller-offers.service';
import { SellerOffersController } from './seller-offers.controller';

@Module({
  controllers: [SellerOffersController],
  providers: [SellerOffersService],
})
export class SellerOffersModule {}
