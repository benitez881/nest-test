import { Injectable, Scope } from '@nestjs/common';
import { randomString } from 'src/utils/randomString';

@Injectable({ scope: Scope.REQUEST })
// @Injectable()
export class LifecycleService {
  private lct: string;
  private plct: string;

  private generateLifecycleToken(): string {
    const lct = randomString(30);
    this.setLifecycleToken(lct);
    return lct;
  }

  private setLifecycleToken(token: string) {
    this.lct = token;
  }

  private setParentLifecycleToken(token: string) {
    this.plct = token;
  }

  setProcessTokens(plct: string) {
    // if (plct.startsWith('CRON') || this.plct.startsWith('CRON')) {
    // }
    // const eMessage =
    //   'already exist. setProcessTokens should be called once on each process';
    // if (!!this.plct) {
    //   throw new Error(`parentlifecycletoken ${eMessage}`);
    // }
    // if (!!this.lct) {
    //   throw new Error(`lifecycletoken ${eMessage}`);
    // }

    this.setParentLifecycleToken(plct);
    const lct = this.generateLifecycleToken();
    // console.log({ parentLifecycleToken: plct, lifecycleToken: lct });
    return { parentLifecycleToken: plct, lifecycleToken: lct };
  }

  get lifecycleToken() {
    return this.lct;
  }

  get parentLifecycleToken() {
    return this.plct;
  }
}
