import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LifecycleService } from 'src/tokens/tokens.service';

@Injectable()
export class LifecycleMiddleware implements NestMiddleware {
  constructor(
    @Inject(LifecycleService) private lifecycleService: LifecycleService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { lifecycletoken: plct = '' } = req.headers;
    const { lifecycleToken, parentLifecycleToken } =
      this.lifecycleService.setProcessTokens(plct as string);

    // console.log('lct from middleware', lifecycleToken);
    // console.log('plct from middleware', parentLifecycleToken);

    next();
  }
}
