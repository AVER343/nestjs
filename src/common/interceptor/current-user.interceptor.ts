import { Request } from 'express';
/*
https://docs.nestjs.com/interceptors#interceptors
*/

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/user/user.service';
import { JWT_COOKIE_KEY, JWT_COOKIE_SECRET } from 'config/constant';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    
    return next.handle().pipe();
  }
}
