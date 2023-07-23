import { Test, TestingModule } from '@nestjs/testing';
import { SellerOffersService } from './seller-offers.service';

describe('SellerOffersService', () => {
  let service: SellerOffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerOffersService],
    }).compile();

    service = module.get<SellerOffersService>(SellerOffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
