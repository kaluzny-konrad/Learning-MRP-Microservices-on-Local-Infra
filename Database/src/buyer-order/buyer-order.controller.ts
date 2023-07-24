import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BuyerOrderService } from './buyer-order.service';
import { CreateBuyerOrderDto, UpdateBuyerOrderDto } from './buyerOrderDto';

@Controller('buyer-order')
export class BuyerOrderController {
  constructor(private readonly buyerOrderService: BuyerOrderService) {}

  @Post()
  create(@Body() createBuyerOrderDto: CreateBuyerOrderDto) {
    return this.buyerOrderService.create(createBuyerOrderDto);
  }

  @Get()
  findAll() {
    return this.buyerOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyerOrderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBuyerOrderDto: UpdateBuyerOrderDto,
  ) {
    return this.buyerOrderService.update(+id, updateBuyerOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyerOrderService.remove(+id);
  }
}
