import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.userFindMany();
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.userFindUnique({ id });
  }

  async create(data: User): Promise<User> {
    return this.prisma.userCreate(data);
  }

  async update(id: number, data: User): Promise<User | null> {
    return this.prisma.userUpdate({ where: { id }, data });
  }

  async delete(id: number): Promise<User | null> {
    return this.prisma.userDelete({ id });
  }
}
