import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  findAll(category?: string) {
    return this.prisma.food.findMany({
      where: { ...(category && { category }) },
      orderBy: { category: 'asc' },
      include: { pairingBeer: { select: { id: true, name: true, style: true } } },
    });
  }

  async findOne(id: string) {
    const food = await this.prisma.food.findUnique({
      where: { id },
      include: { pairingBeer: true },
    });
    if (!food) throw new NotFoundException(`Plato ${id} no encontrado`);
    return food;
  }

  create(dto: CreateFoodDto) {
    return this.prisma.food.create({ data: dto });
  }

  async update(id: string, dto: UpdateFoodDto) {
    await this.findOne(id);
    return this.prisma.food.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.food.delete({ where: { id } });
  }

  async toggleAvailable(id: string) {
    const food = await this.findOne(id);
    return this.prisma.food.update({ where: { id }, data: { available: !food.available } });
  }
}
