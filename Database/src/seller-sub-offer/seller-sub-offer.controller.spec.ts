import { Test, TestingModule } from '@nestjs/testing';
import { SellerSubOfferController } from './seller-sub-offer.controller';
import { SellerSubOfferService } from './seller-sub-offer.service';

describe('SellerSubOfferController', () => {
  let controller: SellerSubOfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerSubOfferController],
      providers: [SellerSubOfferService],
    }).compile();

    controller = module.get<SellerSubOfferController>(SellerSubOfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
