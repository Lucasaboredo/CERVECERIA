import { IsString, IsNumber, IsBoolean, IsOptional, IsIn, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBeerDto {
  @ApiProperty({ example: 'Golden Sunset IPA' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'IPA', enum: ['IPA','Lager','Stout','Amber Ale','Wheat','Porter','Pale Ale','Sour','Red Ale'] })
  @IsString()
  style: string;

  @ApiPropertyOptional({ example: 'Local', enum: ['Local','Importada'] })
  @IsOptional()
  @IsString()
  origin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 58 })
  @Type(() => Number)
  @IsNumber()
  @Min(0) @Max(120)
  ibu: number;

  @ApiProperty({ example: 6.2 })
  @Type(() => Number)
  @IsNumber()
  @Min(0) @Max(20)
  abv: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  onTap?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  bestseller?: boolean;

  @ApiProperty({ example: 1100 })
  @Type(() => Number)
  @IsNumber()
  priceHalf: number;

  @ApiProperty({ example: 1950 })
  @Type(() => Number)
  @IsNumber()
  pricePint: number;

  @ApiPropertyOptional({ example: 4500 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceGrowler?: number;
}
