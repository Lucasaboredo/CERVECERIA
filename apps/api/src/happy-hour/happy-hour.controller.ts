import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HappyHourService } from './happy-hour.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('happy-hour')
@Controller('happy-hour')
export class HappyHourController {
  constructor(private readonly service: HappyHourService) {}

  @Get('status')
  @ApiOperation({ summary: 'Estado actual del Happy Hour (público)' })
  getStatus() {
    return this.service.getStatus();
  }

  @Get('config')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener configuración (admin)' })
  getConfig() {
    return this.service.getConfig();
  }

  @Patch('config')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar configuración (admin)' })
  update(@Body() data: any) {
    return this.service.update(data);
  }
}
