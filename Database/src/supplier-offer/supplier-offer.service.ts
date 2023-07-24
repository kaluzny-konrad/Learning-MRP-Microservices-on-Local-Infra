import { Injectable } from '@nestjs/common';
import {
  CreateSupplierOfferDto,
  UpdateSupplierOfferDto,
} from './supplierOfferDto';

@Injectable()
export class SupplierOfferService {
  create(createSupplierOfferDto: CreateSupplierOfferDto) {
    return `This action adds a new supplierOffer ${createSupplierOfferDto}`;
  }

  findAll() {
    return `This action returns all supplierOffer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplierOffer`;
  }

  update(id: number, updateSupplierOfferDto: UpdateSupplierOfferDto) {
    return `This action updates a #${id} supplierOffer ${updateSupplierOfferDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplierOffer`;
  }
}
