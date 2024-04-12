import { Inject } from '@nestjs/common';
import { Interval as NestInterval } from '@nestjs/schedule';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { LifecycleService } from './tokens.service';

export const IntervalWithTokens = (Interval: number): MethodDecorator => {
  return (target, key, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const servicesContainer = {};

      let lifecycleService = (this as any).lifecycleService;
      let asyncContext = (this as any).asyncContext;

      if (!lifecycleService) {
        const injectMyService = Inject(LifecycleService);
        injectMyService(lifecycleService, 'lifecycleService');
        lifecycleService = (servicesContainer as any).lifecycleService;
      }
      if (!asyncContext) {
        const injectMyService = Inject(AsyncContext);
        injectMyService(asyncContext, 'asyncContext');
        asyncContext = (servicesContainer as any).asyncContext;
      }

      const tokens = lifecycleService.setProcessTokens('TIMEOUT');

      asyncContext.register();
      console.log('tokens', tokens);
      asyncContext.set('traceId', JSON.stringify(tokens));
      const result = await originalMethod.apply(this, args);

      return result;
    };

    NestInterval(Interval)(target, key, descriptor);
  };
};
