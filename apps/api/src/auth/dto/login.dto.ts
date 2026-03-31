import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@brew.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'brew-admin-2026' })
  @IsString()
  @MinLength(6)
  password: string;
}
