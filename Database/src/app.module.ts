import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { SellerOffersModule } from './seller-offers/seller-offers.module';

@Module({
  imports: [ProductsModule, SellerOffersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
