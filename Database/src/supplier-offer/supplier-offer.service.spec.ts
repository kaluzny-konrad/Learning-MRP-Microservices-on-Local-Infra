import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOfferService } from './supplier-offer.service';

describe('SupplierOfferService', () => {
  let service: SupplierOfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierOfferService],
    }).compile();

    service = module.get<SupplierOfferService>(SupplierOfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
