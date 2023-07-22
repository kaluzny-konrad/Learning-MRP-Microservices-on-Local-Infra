import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(data: CreateProductDto) {
    return this.product.create({ data });
  }

  async findAll() {
    return this.product.findMany();
  }

  async findOne(id: number) {
    return this.product.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return this.product.findUnique({ where: { name: name } });
  }

  async update(id: number, data: UpdateProductDto) {
    return this.product.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    return this.product.delete({ where: { id } });
  }
}
