import { Injectable } from '@nestjs/common';
import {
  CreateSellerSubOfferDto,
  UpdateSellerSubOfferDto,
} from './sellerSubOfferDto';

@Injectable()
export class SellerSubOfferService {
  create(createSellerSubOfferDto: CreateSellerSubOfferDto) {
    return `This action adds a new sellerSubOffer ${createSellerSubOfferDto}`;
  }

  findAll() {
    return `This action returns all sellerSubOffer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sellerSubOffer`;
  }

  update(id: number, updateSellerSubOfferDto: UpdateSellerSubOfferDto) {
    return `This action updates a #${id} sellerSubOffer ${updateSellerSubOfferDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} sellerSubOffer`;
  }
}
