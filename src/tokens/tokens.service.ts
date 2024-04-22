import { Inject } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { TokensContext, CRON, INTERVAL, TIMEOUT, LIFECYCLE_ID } from './utils';
import { AsyncContext } from '@nestjs-steroids/async-context';

export class LifecycleService {
  constructor(
    @Inject(AsyncContext)
    private asyncContext: AsyncContext<string, TokensContext>,
  ) {}

  private generateToken(prefix = ''): string {
    const length = 20 - prefix.length;
    const token = prefix + randomBytes(length).toString('hex');
    return token;
  }

  private generateLifecycleToken(): string {
    const lct = this.generateToken();
    return lct;
  }

  private setParentLifecycleToken(token: string) {
    if (token === CRON || token === TIMEOUT || token === INTERVAL) {
      const plct = this.generateToken(token);
      return plct;
    }

    if (!token) {
      const plct = this.generateToken('NONE');
      return plct;
    }

    const plct = token;
    return plct;
  }

  private validateTokensCreation() {
    const eMessage =
      'already exist. setProcessTokens should be called once on each process';
    const context = this.asyncContext.get(LIFECYCLE_ID);
    if (!!context?.parentLifecycleToken || !!context?.lifecycleToken) {
      const message = `${
        !!context?.parentLifecycleToken && 'parentlifecycletoken'
      } ${!!context?.lifecycleToken && 'lifecycletoken'} ${eMessage}.`;

      // this.logger?.error(
      //   'LifecycleService setProcessTokens should be called once on each process',
      //   {
      //     parentLifecycleToken: context?.parentLifecycleToken,
      //     lifecycleToken: context?.lifecycleToken,
      //     message,
      //   },
      // );

      throw new Error(message);
    }
  }

  setProcessTokens(plct: string) {
    this.asyncContext.register();

    this.validateTokensCreation();

    const parentLifecycleToken = this.setParentLifecycleToken(plct);
    const lifecycleToken = this.generateToken();

    const processTokens = {
      parentLifecycleToken,
      lifecycleToken,
    };

    this.asyncContext.set(LIFECYCLE_ID, processTokens);

    return processTokens;
  }
}
