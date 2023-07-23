import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SellerOffer } from '@prisma/client';
import { SellerOffersController } from './seller-offers.controller';
import { SellerOffersService } from './seller-offers.service';
import { CreateSellerOfferDto, UpdateSellerOfferDto } from './sellerOfferDto';

describe('SellerOffersController', () => {
  let controller: SellerOffersController;
  const serviceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as any as SellerOffersService;

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
      providers: [{ provide: SellerOffersService, useValue: serviceMock }],
    }).compile();

    controller = module.get<SellerOffersController>(SellerOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of seller offers', async () => {
      const sellerOffers: SellerOffer[] = getCorrectSellerOffers();

      jest.spyOn(serviceMock, 'findAll').mockResolvedValue(sellerOffers);

      expect(await controller.findAll()).toEqual(sellerOffers);
    });
  });

  describe('findOne', () => {
    it('should return a seller offer by ID', async () => {
      jest.spyOn(serviceMock, 'findOne').mockResolvedValue(sellerOffer1);

      const result = await controller.findOne('1');
      expect(result).toEqual(sellerOffer1);
      expect(result).not.toEqual(sellerOffer2);
    });

    it('should throw NotFoundException if seller offer with given ID does not exist', async () => {
      jest.spyOn(serviceMock, 'findOne').mockResolvedValue(null!);

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

      jest.spyOn(serviceMock, 'create').mockResolvedValue(createdSellerOffer);

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

      jest.spyOn(serviceMock, 'findOne').mockResolvedValue(sellerOffer1);
      jest.spyOn(serviceMock, 'update').mockResolvedValue(updatedSellerOffer);

      expect(await controller.update('1', updateData)).toEqual(
        updatedSellerOffer,
      );
    });

    it('should throw NotFoundException if seller offer with given ID does not exist', async () => {
      const updateData: UpdateSellerOfferDto = {
        closed: true,
      };
      jest.spyOn(serviceMock, 'findOne').mockResolvedValue(null!);

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
      jest.spyOn(serviceMock, 'findOne').mockResolvedValue(sellerOffer1);
      jest.spyOn(serviceMock, 'remove').mockResolvedValue(sellerOffer1);

      expect(await controller.remove('1')).toEqual(sellerOffer1);
    });

    it('should throw NotFoundException if seller offer with given ID does not exist', async () => {
      jest.spyOn(serviceMock, 'findOne').mockResolvedValue(null!);

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
