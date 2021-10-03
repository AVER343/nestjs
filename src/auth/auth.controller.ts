import {
  BadRequestException,
  Bind,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { Serialize } from 'src/common/interceptor/serialize.interceptor';
import { UserDto } from 'src/user/dto/user.dto';
import { Response } from 'express';
import { JWT_COOKIE_KEY } from 'config/constant';
import { LoginUserDTO } from './dto/login.dto';
import { Users } from '@prisma/client';
import { JwtStrategy } from './strategy/jwt.strategy';
import { OnlyAuthorized } from 'src/common/guards/authorization.guard';
import { OnlyAuthenticated } from 'src/common/guards/autheticated.guard';
import { MailingProducerService } from 'src/communication/email/message.producer.service';
import { TemplateNames } from 'src/communication/email/interfaces/email.interface';
@Serialize(UserDto)
@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly messageProducerService: MailingProducerService,
  ) {}
  @Post('/signup')
  async signup(
    @Body() data: CreateUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    let user = await this.authService.signup(data);
    let token = await this.authService.userService.getJWT(user);
    res.cookie(JWT_COOKIE_KEY, token);
    res.send(user);
  }
  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() data: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    let user: Users = await this.authService.checkCredentials(data);
    if (!user) {
      throw new NotFoundException('No user found');
    }
    //user account deleted/suspended
    if (user.status > 2) {
      throw new BadRequestException(`Account is no longer accessible`);
    }
    let token = await this.authService.userService.getJWT(user);
    res.cookie(JWT_COOKIE_KEY, token);
    return user;
  }

  @Post('/logout')
  @HttpCode(200)
  @UseGuards(OnlyAuthenticated)
  async logout(@Res() res: Response) {
    res.clearCookie(JWT_COOKIE_KEY);
    res.status(200).send({});
  }

  @Post('/otp/:username')
  @HttpCode(200)
  async changePassword(
    @Param('username') username: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let user = await this.authService.userService.findByUsername(username);
    if (!user) {
      res.status(404);
      throw new NotFoundException('No user found');
    }
    let otp = await this.authService.generateOTP(6);
    this.messageProducerService.sendOTP(user, { otp });
    return 'OTP has been sent to the provided email !';
  }

  @Post('/verify/otp/:username')
  async verifyOTP(@Param('username') username){
    

  }
}
