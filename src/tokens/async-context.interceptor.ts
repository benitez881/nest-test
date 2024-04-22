import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LifecycleService } from './tokens.service';

@Injectable()
export class AsyncContextInterceptor implements NestInterceptor {
  constructor(private readonly lifecycleService: LifecycleService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    this.lifecycleService.setProcessTokens(headers.lifecycletoken || '');
    return next.handle();
  }
}
