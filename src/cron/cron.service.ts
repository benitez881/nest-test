import { AsyncContext } from '@nestjs-steroids/async-context';
import { Injectable } from '@nestjs/common';
import { LIFECYCLE_ID, TokensContext } from 'src/tokens/utils';

@Injectable()
export class CronService {
  constructor(private asyncContext: AsyncContext<any, TokensContext>) {}
  getTestCron() {
    // console.log('TestService.getTestCron executed');
    // console.trace();
    // console.log('from cron shit', this.asyncContext.get(LIFECYCLE_ID));
  }
}
