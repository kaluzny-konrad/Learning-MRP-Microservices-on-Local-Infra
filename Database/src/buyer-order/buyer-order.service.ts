import { Injectable } from '@nestjs/common';
import { CreateBuyerOrderDto, UpdateBuyerOrderDto } from './buyerOrderDto';

@Injectable()
export class BuyerOrderService {
  create(createBuyerOrderDto: CreateBuyerOrderDto) {
    return 'This action adds a new buyerOrder';
  }

  findAll() {
    return `This action returns all buyerOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buyerOrder`;
  }

  update(id: number, updateBuyerOrderDto: UpdateBuyerOrderDto) {
    return `This action updates a #${id} buyerOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} buyerOrder`;
  }
}
