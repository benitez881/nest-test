import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CronService } from './cron.service';

@Injectable()
export class CronSchedule {
  constructor(@Inject(CronService) private cronService: CronService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async refreshCacheLastDay() {
    console.log('CronExpression.EVERY_10_SECONDS');
    this.cronService.getTestCron();
  }

  //   @Timeout(0)
  //   async recacheAllOrders() {
  //     await this.cache.cacheNewOrders('4 weeks', true);
  //   }
}
