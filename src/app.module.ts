import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LifecycleService } from './tokens/tokens.service';
import { CronModule } from './cron/cron.module';
import Axios from 'axios';
import { ScheduleModule } from '@nestjs/schedule';
import {
  AsyncContext,
  AsyncContextModule,
} from '@nestjs-steroids/async-context';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LIFECYCLE_ID, TokensContext } from './tokens/utils';
import { AsyncContextInterceptor } from './tokens/async-context.interceptor';

@Module({
  imports: [CronModule, ScheduleModule.forRoot(), AsyncContextModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    LifecycleService,
    {
      inject: [AsyncContext],
      provide: 'axios-int',
      useFactory: (asyncContext: AsyncContext<string, TokensContext>) => {
        const axios = Axios.create({
          baseURL: 'http://localhost:3001',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        axios.interceptors.request.use(async (config) => {
          const tokens = asyncContext.get(LIFECYCLE_ID);
          config.headers['parentLifecycleToken'] = tokens.parentLifecycleToken;
          config.headers['lifecycleToken'] = tokens.lifecycleToken;
          console.log('config.headers', config.headers);

          return config;
        });

        return axios;
      },
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AsyncContextInterceptor,
    },
  ],
})
export class AppModule {
  constructor() {} // @Inject(SchedulerService) private schedulerService: SchedulerService,

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LifecycleMiddleware).forRoutes('*'); // Apply middleware globally
  // }

  // async onApplicationBootstrap() {
  //   this.schedulerService.modifyCronTasks();
  // }
}
