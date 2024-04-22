import { Inject, Injectable } from '@nestjs/common';
import { LifecycleService } from './tokens/tokens.service';
import { AxiosInstance } from 'axios';
import { wait } from 'rollun-ts-utils';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { TokensContext, LIFECYCLE_ID } from './tokens/utils';

@Injectable()
export class AppService {
  constructor(
    @Inject(AsyncContext)
    private asyncContext: AsyncContext<string, TokensContext>,
    @Inject('axios-int') private axios: AxiosInstance,
  ) {}

  async getHello(): Promise<any> {
    await wait(5000);
    // console.log('etetetet', {
    //   parentLifecycleToken: this.lifecycleService.parentLifecycleToken,
    //   lifecycleToken: this.lifecycleService.lifecycleToken,
    // });
    const tokens = this.asyncContext.get(LIFECYCLE_ID);
    return {
      parentLifecycleToken: tokens.parentLifecycleToken,
      lifecycleToken: tokens.lifecycleToken,
    };
  }

  getTest(): any {
    // console.trace();
    this.axios.get('/');
  }

  getTestCron(): any {
    // console.trace();
    this.axios.get('/');
  }
}
