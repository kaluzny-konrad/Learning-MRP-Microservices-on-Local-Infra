import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { SellerOffersModule } from './seller-offers/seller-offers.module';
import { SupplierOffersModule } from './supplier-offers/supplier-offers.module';
import { SupplierSubOfferModule } from './supplier-sub-offer/supplier-sub-offer.module';
import { SellerSubOfferModule } from './seller-sub-offer/seller-sub-offer.module';
import { BuyerOrderModule } from './buyer-order/buyer-order.module';
import { SellerOrderModule } from './seller-order/seller-order.module';
import { SellerModule } from './seller/seller.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { BuyerModule } from './buyer/buyer.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    SellerOffersModule,
    SupplierOffersModule,
    SupplierSubOfferModule,
    SellerSubOfferModule,
    BuyerOrderModule,
    SellerOrderModule,
    SellerModule,
    SuppliersModule,
    BuyerModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
