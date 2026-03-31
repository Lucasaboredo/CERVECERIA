import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { StylesService } from './styles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('styles')
export class StylesController {
  constructor(private readonly stylesService: StylesService) {}

  @Get()
  async findAll() {
    return this.stylesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: { name: string }) {
    // To prevent duplicate errors gracefully, you could check if it exists:
    // But since name is @unique, Prisma throws an error if duplicate. 
    // Usually simple catch block is fine, or let the frontend handle the generic error.
    return this.stylesService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.stylesService.delete(id);
  }
}
