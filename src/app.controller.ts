import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';


@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getHello(): string {
    return this.prismaService.getHello();
  }
}
