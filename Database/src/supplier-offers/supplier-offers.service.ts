import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateSupplierOfferDto,
  UpdateSupplierOfferDto,
} from './supplierOfferDto';
import { PrismaClient, SupplierOffer } from '@prisma/client';

@Injectable()
export class SupplierOffersService
  extends PrismaClient
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }

  async create(data: CreateSupplierOfferDto): Promise<SupplierOffer> {
    return await this.supplierOffer.create({ data });
  }

  async findAll(): Promise<SupplierOffer[]> {
    return await this.supplierOffer.findMany();
  }

  async findOne(id: number): Promise<SupplierOffer | null> {
    return await this.supplierOffer.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: UpdateSupplierOfferDto,
  ): Promise<SupplierOffer> {
    return await this.supplierOffer.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<SupplierOffer> {
    return await this.supplierOffer.delete({ where: { id } });
  }
}
