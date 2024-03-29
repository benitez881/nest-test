import { Inject, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LifecycleService } from './tokens/tokens.service';
import { LifecycleMiddleware } from './tokens/tokens.middleware';
import { CronModule } from './cron/cron.module';
import Axios from 'axios';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './tokens/scheduler.service';

@Module({
  imports: [CronModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    SchedulerService,
    LifecycleService,
    {
      inject: [LifecycleService],
      provide: 'axios-int',
      useFactory: (lifecycleService: LifecycleService) => {
        const axios = Axios.create({
          baseURL: 'http://localhost:3001',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        axios.interceptors.request.use(async (config) => {
          config.headers['parentLifecycleToken'] =
            lifecycleService.parentLifecycleToken;
          config.headers['lifecycleToken'] = lifecycleService.lifecycleToken;

          return config;
        });

        return axios;
      },
    },
  ],
})
export class AppModule {
  constructor(
    @Inject(SchedulerService) private schedulerService: SchedulerService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LifecycleMiddleware).forRoutes('*'); // Apply middleware globally
  }

  onModuleInit() {
    // console.log('appmoduleinit');
  }

  async onApplicationBootstrap() {
    this.schedulerService.modifyCronTasks();
  }
}
