import { Injectable } from '@nestjs/common';
import { CreateSupplierDto, UpdateSupplierDto } from './supplierDto';

@Injectable()
export class SupplierService {
  create(createSupplierDto: CreateSupplierDto) {
    return `This action adds a new supplier ${createSupplierDto}`;
  }

  findAll() {
    return `This action returns all supplier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier ${updateSupplierDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
