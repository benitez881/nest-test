import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { LifecycleService } from './tokens.service';
import { CronJob } from 'cron';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly lifecycleService: LifecycleService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  modifyCronTasks() {
    const cronJobs = this.schedulerRegistry.getCronJobs();
    const cronJobsObj = Object.fromEntries(cronJobs.entries());

    Object.keys(cronJobsObj).forEach((key) => {
      const cronJob = cronJobsObj[key] as CronJob;
      cronJob.addCallback(() => {
        this.lifecycleService.setProcessTokens('CRON');
      });
    });
  }
}
