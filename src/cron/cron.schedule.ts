import { Inject, Injectable } from '@nestjs/common';
import { CronExpression } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { wait } from 'rollun-ts-utils';
import { LifecycleService } from 'src/tokens/tokens.service';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { CronWithTokens } from 'src/tokens/cron.decorator';
import { TimeoutWithTokens } from 'src/tokens/timeout.decorator';
import { IntervalWithTokens } from 'src/tokens/interval.decorator';

@Injectable()
export class CronSchedule {
  constructor(
    @Inject(CronService) private cronService: CronService,
    @Inject(LifecycleService) private lifecycleService: LifecycleService,
    private readonly asyncContext: AsyncContext<string, string>,
  ) {}

  @CronWithTokens(CronExpression.EVERY_10_SECONDS)
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

  @CronWithTokens(CronExpression.EVERY_10_SECONDS)
  async refreshCacheLastDay2() {
    await wait(6000);

    console.log(
      "this.asyncContext.get('traceId')2;",
      this.asyncContext.get('traceId'),
    );

    this.cronService.getTestCron();
    // console.log('CronExpression.EVERY_10_SECONDS', {
    //   lifecycleToken: this.lifecycleService.lifecycleToken,
    //   parentLifecycleToken: this.lifecycleService.parentLifecycleToken,
    // });
  }

  @TimeoutWithTokens(0)
  async recacheAllOrders() {
    console.log(
      "this.asyncContext.get('traceId');timeout",
      this.asyncContext.get('traceId'),
    );
    this.cronService.getTestCron();
  }

  @IntervalWithTokens(5000)
  async recacheAllOrders2() {
    console.log(
      "this.asyncContext.get('traceId');interval",
      this.asyncContext.get('traceId'),
    );
    this.cronService.getTestCron();
  }
}
