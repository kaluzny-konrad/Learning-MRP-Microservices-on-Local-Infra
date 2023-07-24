import { Injectable } from '@nestjs/common';
import {
  CreateSupplierSubOfferDto,
  UpdateSupplierSubOfferDto,
} from './supplierSubOfferDto';

@Injectable()
export class SupplierSubOfferService {
  create(createSupplierSubOfferDto: CreateSupplierSubOfferDto) {
    return `This action adds a new supplierSubOffer ${createSupplierSubOfferDto}`;
  }

  findAll() {
    return `This action returns all supplierSubOffer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplierSubOffer`;
  }

  update(id: number, updateSupplierSubOfferDto: UpdateSupplierSubOfferDto) {
    return `This action updates a #${id} supplierSubOffer ${updateSupplierSubOfferDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplierSubOffer`;
  }
}
