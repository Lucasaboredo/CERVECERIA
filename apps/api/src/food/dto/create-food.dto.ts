import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateFoodDto {
  @ApiProperty({ example: 'Smash Burger BREW' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Hamburguesas', enum: ['Hamburguesas','Tapeo','Veggie','Entradas','Postres'] })
  @IsString()
  category: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 3200 })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @ApiPropertyOptional({ description: 'ID de la cerveza de maridaje' })
  @IsOptional()
  @IsString()
  pairingBeerId?: string;
}
