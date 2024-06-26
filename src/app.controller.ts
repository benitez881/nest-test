import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { wait } from 'rollun-ts-utils';
import { TokensContext } from './tokens/utils';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly asyncContext: AsyncContext<string, TokensContext>,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    // console.log(
    //   'this.asyncContext.get(traceId)',
    //   this.asyncContext.get(LIFECYCLE_ID),
    // );
    return await this.appService.getHello();
  }

  @Get('test')
  async getTest(): Promise<any> {
    await wait(5000);
    this.appService.getTest();
    // console.log(
    //   'this.asyncContext.get(traceId)',
    //   this.asyncContext.get(LIFECYCLE_ID),
    // );
  }
}
