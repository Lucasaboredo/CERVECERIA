import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StylesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.style.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(data: { name: string }) {
    return this.prisma.style.create({
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.style.delete({
      where: { id },
    });
  }
}
