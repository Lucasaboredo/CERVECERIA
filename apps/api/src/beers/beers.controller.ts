import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, Query, UseGuards,
  ParseBoolPipe, HttpCode, HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BeersService } from './beers.service';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('beers')
@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las cervezas (público)' })
  @ApiQuery({ name: 'style', required: false, example: 'IPA' })
  @ApiQuery({ name: 'onTap', required: false, type: Boolean })
  findAll(
    @Query('style') style?: string,
    @Query('onTap') onTap?: string,
  ) {
    const onTapBool = onTap === 'true' ? true : onTap === 'false' ? false : undefined;
    return this.beersService.findAll(style, onTapBool);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cerveza por ID (público)' })
  findOne(@Param('id') id: string) {
    return this.beersService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear cerveza (admin)' })
  create(@Body() dto: CreateBeerDto) {
    return this.beersService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar cerveza (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateBeerDto) {
    return this.beersService.update(id, dto);
  }

  @Patch(':id/toggle-tap')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle On Tap / Sold Out (admin)' })
  toggleTap(@Param('id') id: string) {
    return this.beersService.toggleOnTap(id);
  }

  @Patch(':id/toggle-bestseller')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle Más Vendida (admin)' })
  toggleBestseller(@Param('id') id: string) {
    return this.beersService.toggleBestseller(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar cerveza (admin)' })
  remove(@Param('id') id: string) {
    return this.beersService.remove(id);
  }
}
