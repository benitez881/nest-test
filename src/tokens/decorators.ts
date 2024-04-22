import { Inject } from '@nestjs/common';
import {
  Timeout as NestTimeout,
  Cron as NestCron,
  Interval as NestInterval,
} from '@nestjs/schedule';
import { LifecycleService } from './tokens.service';
import { TIMEOUT, CRON, INTERVAL } from './utils';

interface Descriptor extends PropertyDescriptor {
  lifecycleService?: LifecycleService;
}

const withTokens = <T>(
  processTokens: string,
  scheduler: (time: T) => MethodDecorator,
  time: T,
): MethodDecorator => {
  return (target, key, descriptor: Descriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      if (!this.lifecycleService) {
        const injectMyService = Inject(LifecycleService);
        injectMyService(target, 'lifecycleService');
      }
      console.log('this.lifecycleService', this.lifecycleService);

      this.lifecycleService?.setProcessTokens(processTokens);
      const result = await originalMethod.apply(this, args);
      return result;
    };

    scheduler(time)(target, key, descriptor);
  };
};

export const TimeoutWithTokens = (time: number): MethodDecorator =>
  withTokens<number>(TIMEOUT, NestTimeout, time);

export const IntervalWithTokens = (time: number): MethodDecorator =>
  withTokens<number>(INTERVAL, NestInterval, time);

export const CronWithTokens = (cronTime: string): MethodDecorator =>
  withTokens<string | Date>(CRON, NestCron, cronTime);
