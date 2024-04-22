import { Inject, Injectable } from '@nestjs/common';
import { CronExpression } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { wait } from 'rollun-ts-utils';
import { LifecycleService } from 'src/tokens/tokens.service';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { LIFECYCLE_ID, TokensContext } from 'src/tokens/utils';
import {
  CronWithTokens,
  IntervalWithTokens,
  TimeoutWithTokens,
} from 'src/tokens/decorators';

@Injectable()
export class CronSchedule {
  constructor(
    @Inject(CronService) private cronService: CronService,
    @Inject(LifecycleService) private lifecycleService: LifecycleService,
    private readonly asyncContext: AsyncContext<string, TokensContext>,
  ) {}

  @CronWithTokens(CronExpression.EVERY_10_SECONDS)
  async refreshCacheLastDay() {
    await wait(6000);

    console.log(
      'this.asyncContext.get(LIFECYCLE_ID);',
      this.asyncContext.get(LIFECYCLE_ID),
    );

    this.cronService.getTestCron();
    // console.log('CronExpression.EVERY_10_SECONDS', {
    //   lifecycleToken: this.lifecycleService.lifecycleToken,
    //   parentLifecycleToken: this.lifecycleService.parentLifecycleToken,
    // });
  }

  // @CronWithTokens(CronExpression.EVERY_10_SECONDS)
  // async refreshCacheLastDay2() {
  //   await wait(6000);

  //   console.log(
  //     "this.asyncContext.get(LIFECYCLE_ID)2;",
  //     this.asyncContext.get(LIFECYCLE_ID),
  //   );

  //   this.cronService.getTestCron();
  //   // console.log('CronExpression.EVERY_10_SECONDS', {
  //   //   lifecycleToken: this.lifecycleService.lifecycleToken,
  //   //   parentLifecycleToken: this.lifecycleService.parentLifecycleToken,
  //   // });
  // }

  @TimeoutWithTokens(0)
  async recacheAllOrders() {
    console.log(
      'this.asyncContext.get(LIFECYCLE_ID);timeout',
      this.asyncContext.get(LIFECYCLE_ID),
    );
    this.cronService.getTestCron();
  }

  @IntervalWithTokens(5000)
  async recacheAllOrders2() {
    console.log(
      'this.asyncContext.get(LIFECYCLE_ID);interval',
      this.asyncContext.get(LIFECYCLE_ID),
    );
    this.cronService.getTestCron();
  }
}
