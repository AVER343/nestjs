import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';
export declare class CurrentUserInterceptor implements NestInterceptor {
    private userService;
    constructor(userService: UserService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
