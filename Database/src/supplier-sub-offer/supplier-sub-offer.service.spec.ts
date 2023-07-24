import { Test, TestingModule } from '@nestjs/testing';
import { SupplierSubOfferService } from './supplier-sub-offer.service';

describe('SupplierSubOfferService', () => {
  let service: SupplierSubOfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierSubOfferService],
    }).compile();

    service = module.get<SupplierSubOfferService>(SupplierSubOfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
