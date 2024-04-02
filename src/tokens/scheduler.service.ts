import { Injectable } from '@nestjs/common';
// import { SchedulerRegistry } from '@nestjs/schedule';
// import { LifecycleService } from './tokens.service';
// import { CronJob } from 'cron';
// import { AsyncContext } from '@nestjs-steroids/async-context';

@Injectable()
export class SchedulerService {
  //   constructor(
  //     private readonly lifecycleService: LifecycleService,
  //     private readonly asyncContext: AsyncContext<string, string>,
  //     private readonly schedulerRegistry: SchedulerRegistry,
  //   ) {}
  //   modifyCronTasks() {
  //     const cronJobs = this.schedulerRegistry.getCronJobs();
  //     const cronJobsObj = Object.fromEntries(cronJobs.entries());
  //     console.log('cronJobs', cronJobs);
  //     Object.keys(cronJobsObj).forEach((key) => {
  //       const cronJob = cronJobsObj[key] as CronJob;
  //       const originalCallback = cronJob._callbacks[0];
  //       console.log('cronJobsObj');
  //       // cronJob._callbacks[0] = async () => {
  //       //   this.asyncContext.register();
  //       //   const tokens = this.lifecycleService.setProcessTokens('CRON');
  //       //   console.log('tokens', tokens);
  //       //   this.asyncContext.set('traceId', JSON.stringify(tokens));
  //       //   await originalCallback.call(cronJob);
  //       // };
  //       // cronJob.addCallback(() => {
  //       //   this.asyncContext.register();
  //       //   const tokens = this.lifecycleService.setProcessTokens('CRON');
  //       //   console.log('tokens', tokens);
  //       //   this.asyncContext.set('traceId', JSON.stringify(tokens));
  //       // });
  //     });
  //   }
}
