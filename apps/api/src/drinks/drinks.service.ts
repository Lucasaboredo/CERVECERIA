import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@Injectable()
export class DrinksService {
  constructor(private prisma: PrismaService) {}

  findAll(category?: string) {
    return this.prisma.drink.findMany({
      where: { ...(category && { category }) },
      orderBy: { category: 'asc' },
    });
  }

  async findOne(id: string) {
    const drink = await this.prisma.drink.findUnique({
      where: { id },
    });
    if (!drink) throw new NotFoundException(`Trago ${id} no encontrado`);
    return drink;
  }

  create(dto: CreateDrinkDto) {
    return this.prisma.drink.create({ data: dto });
  }

  async update(id: string, dto: UpdateDrinkDto) {
    await this.findOne(id);
    return this.prisma.drink.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.drink.delete({ where: { id } });
  }

  async toggleAvailable(id: string) {
    const drink = await this.findOne(id);
    return this.prisma.drink.update({ where: { id }, data: { available: !drink.available } });
  }
}
