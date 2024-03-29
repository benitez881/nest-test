import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronSchedule } from './cron.schedule';

@Module({
  providers: [CronService, CronSchedule],
})
export class CronModule {}
