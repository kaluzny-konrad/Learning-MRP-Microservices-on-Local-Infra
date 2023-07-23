import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateProductDto } from './productDto';
import { CreateProductDto } from './productDto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(data: CreateProductDto): Promise<Product> {
    return await this.product.create({ data });
  }

  async findAll(): Promise<Product[]> {
    return await this.product.findMany();
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.product.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<Product | null> {
    return await this.product.findUnique({ where: { name } });
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    return await this.product.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<Product> {
    return await this.product.delete({ where: { id } });
  }
}
