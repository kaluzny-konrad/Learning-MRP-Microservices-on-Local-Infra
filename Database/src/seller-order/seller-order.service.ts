import { Injectable } from '@nestjs/common';
import { CreateSellerOrderDto, UpdateSellerOrderDto } from './sellerOrderDto';

@Injectable()
export class SellerOrderService {
  create(createSellerOrderDto: CreateSellerOrderDto) {
    return `This action adds a new sellerOrder ${createSellerOrderDto}`;
  }

  findAll() {
    return `This action returns all sellerOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sellerOrder`;
  }

  update(id: number, updateSellerOrderDto: UpdateSellerOrderDto) {
    return `This action updates a #${id} sellerOrder ${updateSellerOrderDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} sellerOrder`;
  }
}
