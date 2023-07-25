import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOffersController } from './supplier-offers.controller';
import { SupplierOffersService } from './supplier-offers.service';

describe('SupplierOffersController', () => {
  let controller: SupplierOffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierOffersController],
      providers: [SupplierOffersService],
    }).compile();

    controller = module.get<SupplierOffersController>(SupplierOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
