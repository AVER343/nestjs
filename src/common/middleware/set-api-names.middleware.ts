/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { JWT_COOKIE_KEY } from 'config/constant';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(public userService: UserService) {}
  async use(req: Request, res: Response, next: Function) {
    let user = null;
    let token = (req.cookies && req.cookies[JWT_COOKIE_KEY]) || null;
    if (token) {
      let __user = await this.userService.verifyJWT(token);
      if (__user) {
        user = await this.userService.findById(__user.id);
        console.log({user})
        if (user) delete user.password;
      }
    }
    req.user = user;
    next();
  }
}
