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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product as ProductModel } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<ProductModel[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductModel> {
    const idNumber = Number(id);
    return await this.productsService.findOne(idNumber);
  }

  @Post()
  async create(@Body() createDto: CreateProductDto): Promise<ProductModel> {
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
  ): Promise<ProductModel> {
    const idNumber = Number(id);
    const existedProduct = await this.productsService.findOne(idNumber);
    if (existedProduct) {
      return await this.productsService.update(idNumber, updateDto);
    } else {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProductModel> {
    const idNumber = Number(id);
    const existedProduct = await this.productsService.findOne(idNumber);
    if (existedProduct) {
      return this.productsService.remove(idNumber);
    } else {
      throw new NotFoundException();
    }
  }
}
