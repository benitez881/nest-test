import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronSchedule } from './cron.schedule';
import { LifecycleService } from 'src/tokens/tokens.service';

@Module({
  providers: [CronService, CronSchedule, LifecycleService],
})
export class CronModule {}
