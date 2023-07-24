import { Test, TestingModule } from '@nestjs/testing';
import { SellerSubOfferService } from './seller-sub-offer.service';

describe('SellerSubOfferService', () => {
  let service: SellerSubOfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerSubOfferService],
    }).compile();

    service = module.get<SellerSubOfferService>(SellerSubOfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
