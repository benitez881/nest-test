import { Inject, Injectable } from '@nestjs/common';
import { LifecycleService } from './tokens/tokens.service';
import { AxiosInstance } from 'axios';
import { wait } from 'rollun-ts-utils';

@Injectable()
export class AppService {
  constructor(
    @Inject(LifecycleService) private lifecycleService: LifecycleService,
    @Inject('axios-int') private axios: AxiosInstance,
  ) {}

  async getHello(): Promise<any> {
    await wait(5000);
    // console.log('etetetet', {
    //   parentLifecycleToken: this.lifecycleService.parentLifecycleToken,
    //   lifecycleToken: this.lifecycleService.lifecycleToken,
    // });

    return {
      parentLifecycleToken: this.lifecycleService.parentLifecycleToken,
      lifecycleToken: this.lifecycleService.lifecycleToken,
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
