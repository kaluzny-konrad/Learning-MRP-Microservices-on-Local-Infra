import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateSellerOfferDto } from 'libs/validators/sellerOffer';
import { UpdateSellerOfferDto } from 'libs/validators/sellerOffer';
import { SellerOffer } from '@prisma/client';

@Injectable()
export class SellerOffersService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(data: CreateSellerOfferDto): Promise<SellerOffer> {
    return await this.sellerOffer.create({ data });
  }

  async findAll(): Promise<SellerOffer[]> {
    return await this.sellerOffer.findMany();
  }

  async findOne(id: number): Promise<SellerOffer | null> {
    return await this.sellerOffer.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateSellerOfferDto): Promise<SellerOffer> {
    return await this.sellerOffer.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<SellerOffer> {
    return await this.sellerOffer.delete({ where: { id } });
  }
}
