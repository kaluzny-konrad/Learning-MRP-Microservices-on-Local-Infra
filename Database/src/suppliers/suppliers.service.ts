import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateSupplierDto, UpdateSupplierDto } from './supplierDto';
import { PrismaClient, Supplier } from '@prisma/client';

@Injectable()
export class SuppliersService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(data: CreateSupplierDto): Promise<Supplier> {
    return await this.supplier.create({ data });
  }

  async findAll(): Promise<Supplier[]> {
    return await this.supplier.findMany();
  }

  async findByUserId(userId: string): Promise<Supplier[]> {
    return await this.supplier.findMany({ where: { userId } });
  }

  async findOne(id: number): Promise<Supplier | null> {
    return await this.supplier.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateSupplierDto): Promise<Supplier> {
    return await this.supplier.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<Supplier> {
    return await this.supplier.delete({ where: { id } });
  }
}
