import { Module } from '@nestjs/common';
import { BuyerOrderService } from './buyer-order.service';
import { BuyerOrderController } from './buyer-order.controller';

@Module({
  controllers: [BuyerOrderController],
  providers: [BuyerOrderService],
})
export class BuyerOrderModule {}
