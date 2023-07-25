import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUser, UpdateUser } from './userDto';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(data: CreateUser): Promise<User> {
    return await this.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return await this.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.user.findUnique({ where: { email } });
  }

  async update(id: string, data: UpdateUser): Promise<User> {
    return await this.user.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: string) {
    return await this.user.delete({ where: { id } });
  }
}
