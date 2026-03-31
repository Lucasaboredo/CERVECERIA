import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';

@Injectable()
export class BeersService {
  constructor(private prisma: PrismaService) {}

  async findAll(style?: string, onTap?: boolean) {
    return this.prisma.beer.findMany({
      where: {
        ...(style && { style }),
        ...(onTap !== undefined && { onTap }),
      },
      orderBy: [{ bestseller: 'desc' }, { createdAt: 'asc' }],
      include: { foodPairings: { select: { id: true, name: true } } },
    });
  }

  async findOne(id: string) {
    const beer = await this.prisma.beer.findUnique({
      where: { id },
      include: { foodPairings: { select: { id: true, name: true, category: true } } },
    });
    if (!beer) throw new NotFoundException(`Cerveza ${id} no encontrada`);
    return beer;
  }

  async create(dto: CreateBeerDto) {
    return this.prisma.beer.create({ data: dto });
  }

  async update(id: string, dto: UpdateBeerDto) {
    await this.findOne(id); // throws if not found
    return this.prisma.beer.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.beer.delete({ where: { id } });
  }

  async toggleOnTap(id: string) {
    const beer = await this.findOne(id);
    return this.prisma.beer.update({
      where: { id },
      data: { onTap: !beer.onTap },
    });
  }

  async toggleBestseller(id: string) {
    const beer = await this.findOne(id);
    return this.prisma.beer.update({
      where: { id },
      data: { bestseller: !beer.bestseller },
    });
  }
}
