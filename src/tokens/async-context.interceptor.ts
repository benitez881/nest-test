import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { Observable } from 'rxjs';
import { LifecycleService } from './tokens.service';

@Injectable()
export class AsyncContextInterceptor implements NestInterceptor {
  constructor(
    private readonly ac: AsyncContext<string, any>,
    private readonly lifecycleService: LifecycleService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.ac.register(); // Important to call .register or .registerCallback (good for middleware)
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    const tokens = this.lifecycleService.setProcessTokens(
      headers.lifecycletoken || '',
    );
    this.ac.set('traceId', JSON.stringify(tokens));
    return next.handle();
  }
}
