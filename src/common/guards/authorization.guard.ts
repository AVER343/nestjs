import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OnlyAuthorized implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return checkAuthorization(request);
  }
}

function checkAuthorization(
  request: any,
): boolean | Promise<boolean> | Observable<boolean> {
    return true;
}
