import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from 'libs/validators/product';
import { UpdateProductDto } from 'libs/validators/product';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const product1: Product = {
    id: 1,
    name: 'Product Name',
    description: 'Product Description',
    image: 'product.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const product2: Product = {
    id: 2,
    name: 'Product Name2',
    description: 'Product Description2',
    image: 'product2.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  function getCorrectProducts(): Product[] {
    return [product1, product2];
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products: Product[] = getCorrectProducts();

      jest.spyOn(service, 'findAll').mockResolvedValue(products);

      expect(await controller.findAll()).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(product1);

      const result = await controller.findOne('1');
      expect(result).toEqual(product1);
      expect(result).not.toEqual(product2);
    });

    it('should throw NotFoundException if product with given ID does not exist', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

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
    it('should create a new product', async () => {
      const newProduct: CreateProductDto = {
        name: 'Product Name',
        description: 'Product Description',
        image: 'product.jpg',
      };
      const createdProduct: Product = {
        id: 3,
        name: newProduct.name,
        description: newProduct.description!,
        image: newProduct.image!,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findByName').mockResolvedValue(null);
      jest.spyOn(service, 'create').mockResolvedValue(createdProduct);

      expect(await controller.create(newProduct)).toEqual(createdProduct);
    });

    it('should throw BadRequestException if product with the same name already exists', async () => {
      const existingProduct: Product = {
        id: 1,
        name: 'Existing Product',
        description: 'Description',
        image: 'image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const newProduct: CreateProductDto = {
        name: existingProduct.name,
        description: 'Other Description',
        image: 'otherImage.jpg',
      };

      jest.spyOn(service, 'findByName').mockResolvedValue(existingProduct);

      await expect(controller.create(newProduct)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if name is empty', async () => {
      const newProduct: CreateProductDto = {
        name: '',
        description: 'Description',
        image: 'image.jpg',
      };

      await expect(controller.create(newProduct)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if name is not provided', async () => {
      const newProduct: CreateProductDto = {
        name: null!,
        description: 'Description',
        image: 'image.jpg',
      };

      await expect(controller.create(newProduct)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if name is less than 3 characters', async () => {
      const newProduct: CreateProductDto = {
        name: '12',
        description: 'Description',
        image: 'image.jpg',
      };

      await expect(controller.create(newProduct)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if name is more than 200 characters', async () => {
      const newProduct: CreateProductDto = {
        name: 'a'.repeat(201),
        description: 'Description',
        image: 'image.jpg',
      };

      await expect(controller.create(newProduct)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const updateData: UpdateProductDto = { description: 'New Description' };
      const updatedProduct: Product = {
        id: product1.id,
        name: product1.name,
        description: updateData.description!,
        image: product1.image,
        createdAt: product1.createdAt,
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(product1);
      jest.spyOn(service, 'update').mockResolvedValue(updatedProduct);

      expect(await controller.update('1', updateData)).toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product with given ID does not exist', async () => {
      const updateData: UpdateProductDto = { description: 'New Description' };
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.update('999', updateData)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if provided ID is not a valid number', async () => {
      const updateData = { description: 'New Description' };
      await expect(controller.update('abc', updateData)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(product1);
      jest.spyOn(service, 'remove').mockResolvedValue(product1);

      expect(await controller.remove('1')).toEqual(product1);
    });

    it('should throw NotFoundException if product with given ID does not exist', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

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
