import { Injectable, Scope } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable({ scope: Scope.TRANSIENT })
export class LifecycleService {
  private lct: string;
  private plct: string;

  private generateToken(prefix = ''): string {
    const length = 20 - prefix.length;
    const token = prefix + randomBytes(length).toString('hex');
    return token;
  }

  private generateLifecycleToken(): string {
    const lct = this.generateToken();
    this.setLifecycleToken(lct);
    return lct;
  }

  private setLifecycleToken(token: string) {
    this.lct = token;
  }

  private setParentLifecycleToken(token: string) {
    if (token === 'CRON' || token === 'TIMEOUT' || token === 'INTERVAL') {
      this.plct = this.generateToken(token);
      return this.plct;
    }

    if (!token) {
      this.plct = this.generateToken('NONE');
      return this.plct;
    }

    this.plct = token;
    return this.plct;
  }

  private validateTokensCreation() {
    const eMessage =
      'already exist. setProcessTokens should be called once on each process';

    if (!!this.plct || !!this.lct) {
      const message = `${!!this.plct && 'parentlifecycletoken'} ${
        !!this.lct && 'lifecycletoken'
      } ${eMessage}.`;

      // this.logger?.error(
      //   'LifecycleService setProcessTokens should be called once on each process',
      //   { parentLifecycleToken: this.plct, lifecycleToken: this.lct, message },
      // );

      throw new Error(message);
    }
  }

  private setTokens(token: string) {
    const plct = this.setParentLifecycleToken(token);
    const lct = this.generateLifecycleToken();

    // this.logger?.debug('LifecycleService setProcessTokens', {
    //   parentLifecycleToken: plct,
    //   lifecycleToken: lct,
    // });

    return { parentLifecycleToken: plct, lifecycleToken: lct };
  }

  setProcessTokens(plct: string) {
    if (plct !== 'CRON' && plct !== 'TIMEOUT' && plct !== 'INTERVAL') {
      this.validateTokensCreation();
    }

    const processTokens = this.setTokens(plct);
    return processTokens;
  }

  get lifecycleToken() {
    return this.lct;
  }

  get parentLifecycleToken() {
    return this.plct;
  }
}
