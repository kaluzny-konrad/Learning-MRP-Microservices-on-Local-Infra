import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './productDto';
import { UpdateProductDto } from './productDto';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );
    }

    const existedProduct = await this.productsService.findOne(idNumber);
    if (existedProduct) {
      return existedProduct;
    }

    throw new NotFoundException('Product not found');
  }

  @Post()
  async create(@Body() createDto: CreateProductDto): Promise<Product> {
    const existedProduct = await this.productsService.findByName(
      createDto.name,
    );
    if (existedProduct) {
      throw new BadRequestException('Provided name is already existed');
    }
    return await this.productsService.create(createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProductDto,
  ): Promise<Product> {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );
    }

    const existedProduct = await this.productsService.findOne(idNumber);
    if (existedProduct) {
      existedProduct.updatedAt = new Date();
      return await this.productsService.update(idNumber, updateDto);
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException(
        'Invalid ID format. Please provide a valid number.',
      );
    }

    const existedProduct = await this.productsService.findOne(idNumber);
    if (existedProduct) {
      return this.productsService.remove(idNumber);
    } else {
      throw new NotFoundException('Product not found');
    }
  }
}
