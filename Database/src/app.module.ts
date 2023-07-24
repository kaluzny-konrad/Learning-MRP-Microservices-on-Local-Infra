import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { SellerOffersModule } from './seller-offers/seller-offers.module';
import { SupplierOfferModule } from './supplier-offer/supplier-offer.module';
import { SupplierSubOfferModule } from './supplier-sub-offer/supplier-sub-offer.module';
import { SellerSubOfferModule } from './seller-sub-offer/seller-sub-offer.module';
import { BuyerOrderModule } from './buyer-order/buyer-order.module';
import { SellerOrderModule } from './seller-order/seller-order.module';
import { SellerModule } from './seller/seller.module';
import { SupplierModule } from './supplier/supplier.module';
import { BuyerModule } from './buyer/buyer.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    SellerOffersModule,
    SupplierOfferModule,
    SupplierSubOfferModule,
    SellerSubOfferModule,
    BuyerOrderModule,
    SellerOrderModule,
    SellerModule,
    SupplierModule,
    BuyerModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
