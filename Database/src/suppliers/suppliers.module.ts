import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [SuppliersController],
  providers: [SuppliersService, UsersService],
})
export class SuppliersModule {}
