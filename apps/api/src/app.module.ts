import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BeersModule } from './beers/beers.module';
import { FoodModule } from './food/food.module';
import { DrinksModule } from './drinks/drinks.module';
import { HappyHourModule } from './happy-hour/happy-hour.module';
import { UploadModule } from './upload/upload.module';
import { StylesModule } from './styles/styles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    BeersModule,
    FoodModule,
    DrinksModule,
    HappyHourModule,
    UploadModule,
    StylesModule,
  ],
})
export class AppModule {}
