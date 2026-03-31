import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('drinks')
@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener toda la carta de bebidas (público)' })
  findAll(@Query('category') category?: string) {
    return this.drinksService.findAll(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drinksService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear bebida (admin)' })
  create(@Body() dto: CreateDrinkDto) {
    return this.drinksService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateDrinkDto) {
    return this.drinksService.update(id, dto);
  }

  @Patch(':id/toggle-available')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  toggleAvailable(@Param('id') id: string) {
    return this.drinksService.toggleAvailable(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.drinksService.remove(id);
  }
}
