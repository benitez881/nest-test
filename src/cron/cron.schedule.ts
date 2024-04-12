import { Inject, Injectable } from '@nestjs/common';
import { CronExpression } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { wait } from 'rollun-ts-utils';
import { LifecycleService } from 'src/tokens/tokens.service';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { ExtendedCron } from './cron.decorator';

@Injectable()
export class CronSchedule {
  constructor(
    @Inject(CronService) private cronService: CronService,
    @Inject(LifecycleService) private lifecycleService: LifecycleService,
    private readonly asyncContext: AsyncContext<string, string>,
  ) {}

  @ExtendedCron(CronExpression.EVERY_10_SECONDS)
  async refreshCacheLastDay() {
    await wait(6000);

    console.log(
      "this.asyncContext.get('traceId');",
      this.asyncContext.get('traceId'),
    );

    this.cronService.getTestCron();
    // console.log('CronExpression.EVERY_10_SECONDS', {
    //   lifecycleToken: this.lifecycleService.lifecycleToken,
    //   parentLifecycleToken: this.lifecycleService.parentLifecycleToken,
    // });
  }

  @ExtendedCron(CronExpression.EVERY_10_SECONDS)
  async refreshCacheLastDay2() {
    await wait(6000);

    // console.log(
    //   "this.asyncContext.get('traceId')2;",
    //   this.asyncContext.get('traceId'),
    // );

    this.cronService.getTestCron();
    // console.log('CronExpression.EVERY_10_SECONDS', {
    //   lifecycleToken: this.lifecycleService.lifecycleToken,
    //   parentLifecycleToken: this.lifecycleService.parentLifecycleToken,
    // });
  }
  // @Cron(CronExpression.EVERY_MINUTE)
  // async refreshCacheLastDay2() {
  //   await wait(5000);

  //   this.cronService.getTestCron();
  //   console.log('CronExpression.EVERY_10_SECONDS2', {
  //     lifecycleToken: this.lifecycleService.lifecycleToken,
  //     parentLifecycleToken: this.lifecycleService.parentLifecycleToken,
  //   });
  // }

  //   @Timeout(0)
  //   async recacheAllOrders() {
  //     await this.cache.cacheNewOrders('4 weeks', true);
  //   }
}
