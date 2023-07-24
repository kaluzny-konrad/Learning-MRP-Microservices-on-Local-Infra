import { Test, TestingModule } from '@nestjs/testing';
import { BuyerOrderController } from './buyer-order.controller';
import { BuyerOrderService } from './buyer-order.service';

describe('BuyerOrderController', () => {
  let controller: BuyerOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyerOrderController],
      providers: [BuyerOrderService],
    }).compile();

    controller = module.get<BuyerOrderController>(BuyerOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
