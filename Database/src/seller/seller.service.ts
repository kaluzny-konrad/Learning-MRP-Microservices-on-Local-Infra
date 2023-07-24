import { Injectable } from '@nestjs/common';
import { CreateSellerDto, UpdateSellerDto } from './sellerDto';

@Injectable()
export class SellerService {
  create(createSellerDto: CreateSellerDto) {
    return `This action adds a new seller ${createSellerDto}`;
  }

  findAll() {
    return `This action returns all seller`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return `This action updates a #${id} seller ${updateSellerDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }
}
