
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  getHello(): string {
    throw new Error('Method not implemented.');
  }
  private readonly prisma: PrismaClient;
    user: any;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async userFindMany() {
    return await this.prisma.user.findMany();
  }

  async userFindUnique(where: { id: number }) {
    return await this.prisma.user.findUnique({ where });
  }

  async userCreate(data: { name: string; email: string; password: string; phoneNumber: string }) {
    return await this.prisma.user.create({ data });
  }

  async userUpdate(params: { where: { id: number }; data: { name?: string; email?: string; password?: string; phoneNumber: string } }) {
    const { where, data } = params;
    return await this.prisma.user.update({ where, data });
  }

  async userDelete(where: { id: number }) {
    return await this.prisma.user.delete({ where });
  }
  
  // You can add more methods for other models and operations as needed

  async cleanup() {
    await this.prisma.$disconnect();
  }
}