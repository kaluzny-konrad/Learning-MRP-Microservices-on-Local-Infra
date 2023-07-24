import { Injectable } from '@nestjs/common';
import { CreateBuyerDto, UpdateBuyerDto } from './buyerDto';

@Injectable()
export class BuyerService {
  create(createBuyerDto: CreateBuyerDto) {
    return `This action adds a new buyer ${createBuyerDto}`;
  }

  findAll() {
    return `This action returns all buyer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buyer`;
  }

  update(id: number, updateBuyerDto: UpdateBuyerDto) {
    return `This action updates a #${id} buyer ${updateBuyerDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} buyer`;
  }
}
