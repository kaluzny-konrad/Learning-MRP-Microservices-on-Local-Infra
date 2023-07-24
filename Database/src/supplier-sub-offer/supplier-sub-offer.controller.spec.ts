import { Test, TestingModule } from '@nestjs/testing';
import { SupplierSubOfferController } from './supplier-sub-offer.controller';
import { SupplierSubOfferService } from './supplier-sub-offer.service';

describe('SupplierSubOfferController', () => {
  let controller: SupplierSubOfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierSubOfferController],
      providers: [SupplierSubOfferService],
    }).compile();

    controller = module.get<SupplierSubOfferController>(
      SupplierSubOfferController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
