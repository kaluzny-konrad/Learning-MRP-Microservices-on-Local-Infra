import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOfferController } from './supplier-offer.controller';
import { SupplierOfferService } from './supplier-offer.service';

describe('SupplierOfferController', () => {
  let controller: SupplierOfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierOfferController],
      providers: [SupplierOfferService],
    }).compile();

    controller = module.get<SupplierOfferController>(SupplierOfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
