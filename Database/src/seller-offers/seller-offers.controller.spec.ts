import { Test, TestingModule } from '@nestjs/testing';
import { SellerOffersController } from './seller-offers.controller';
import { SellerOffersService } from './seller-offers.service';
import { SellerOffer } from '@prisma/client';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateSellerOfferDto } from './sellerOfferDto';
import { UpdateSellerOfferDto } from './sellerOfferDto';

describe('SellerOffersController', () => {
  let controller: SellerOffersController;
  let service: SellerOffersService;

  const sellerOffer1: SellerOffer = {
    id: 1,
    sellerId: 1,
    closed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const sellerOffer2: SellerOffer = {
    id: 2,
    sellerId: 2,
    closed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  function getCorrectSellerOffers(): SellerOffer[] {
    return [sellerOffer1, sellerOffer2];
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerOffersController],
      providers: [SellerOffersService],
    }).compile();

    controller = module.get<SellerOffersController>(SellerOffersController);
    service = module.get<SellerOffersService>(SellerOffersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of seller offers', async () => {
      const sellerOffers: SellerOffer[] = getCorrectSellerOffers();

      jest.spyOn(service, 'findAll').mockResolvedValue(sellerOffers);

      expect(await controller.findAll()).toEqual(sellerOffers);
    });
  });

  describe('findOne', () => {
    it('should return a seller offer by ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(sellerOffer1);

      const result = await controller.findOne('1');
      expect(result).toEqual(sellerOffer1);
      expect(result).not.toEqual(sellerOffer2);
    });

    it('should throw NotFoundException if seller offer with given ID does not exist', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null!);

      await expect(controller.findOne('999')).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if provided ID is not a valid number', async () => {
      await expect(controller.findOne('abc')).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('create', () => {
    it('should create a new seller offer', async () => {
      const newSellerOffer: CreateSellerOfferDto = {
        sellerId: 3,
      };
      const createdSellerOffer: SellerOffer = {
        id: 3,
        sellerId: 3,
        closed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdSellerOffer);

      expect(await controller.create(newSellerOffer)).toEqual(
        createdSellerOffer,
      );
    });

    it('should throw BadRequestException if seller ID is not provided', async () => {
      const newSellerOffer: CreateSellerOfferDto = {
        sellerId: null!,
      };
      await expect(controller.create(newSellerOffer)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update an existing seller offer', async () => {
      const updateData: UpdateSellerOfferDto = {
        closed: true,
      };
      const updatedSellerOffer: SellerOffer = {
        id: sellerOffer1.id,
        sellerId: sellerOffer1.sellerId,
        closed: updateData.closed!,
        createdAt: sellerOffer1.createdAt,
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(sellerOffer1);
      jest.spyOn(service, 'update').mockResolvedValue(updatedSellerOffer);

      expect(await controller.update('1', updateData)).toEqual(
        updatedSellerOffer,
      );
    });

    it('should throw NotFoundException if seller offer with given ID does not exist', async () => {
      const updateData: UpdateSellerOfferDto = {
        closed: true,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(null!);

      await expect(controller.update('999', updateData)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if provided ID is not a valid number', async () => {
      const updateData = {
        closed: true,
      };
      await expect(controller.update('abc', updateData)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a seller offer', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(sellerOffer1);
      jest.spyOn(service, 'remove').mockResolvedValue(sellerOffer1);

      expect(await controller.remove('1')).toEqual(sellerOffer1);
    });

    it('should throw NotFoundException if seller offer with given ID does not exist', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null!);

      await expect(controller.remove('999')).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if provided ID is not a valid number', async () => {
      await expect(controller.remove('abc')).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
