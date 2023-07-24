import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { SaveUserDto, SaveUpdateUserDto } from './userDto';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(data: SaveUserDto): Promise<User> {
    return await this.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return await this.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.user.findUnique({ where: { email } });
  }

  async update(id: number, data: SaveUpdateUserDto): Promise<User> {
    return await this.user.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    return await this.user.delete({ where: { id } });
  }
}
