import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOffersService } from './supplier-offers.service';

describe('SupplierOffersService', () => {
  let service: SupplierOffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierOffersService],
    }).compile();

    service = module.get<SupplierOffersService>(SupplierOffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
