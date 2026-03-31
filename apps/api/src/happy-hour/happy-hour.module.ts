import { Module } from '@nestjs/common';
import { HappyHourService } from './happy-hour.service';
import { HappyHourController } from './happy-hour.controller';

@Module({
  controllers: [HappyHourController],
  providers: [HappyHourService],
  exports: [HappyHourService],
})
export class HappyHourModule {}
