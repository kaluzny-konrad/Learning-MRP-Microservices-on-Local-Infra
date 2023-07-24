import { Test, TestingModule } from '@nestjs/testing';
import { BuyerOrderService } from './buyer-order.service';

describe('BuyerOrderService', () => {
  let service: BuyerOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyerOrderService],
    }).compile();

    service = module.get<BuyerOrderService>(BuyerOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
