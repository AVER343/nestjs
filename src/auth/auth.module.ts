import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_COOKIE_SECRET, QUEUES } from 'config/constant';
import { JwtStrategy } from './strategy/jwt.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from 'src/common/interceptor/current-user.interceptor';
import { BullModule } from '@nestjs/bull';
import { MailingProducerService } from 'src/communication/email/message.producer.service';
@Module({
  controllers: [AuthController],
  providers: [
    MailingProducerService,
    AuthService,
    UserService,
    PrismaService,
    JwtStrategy,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
  imports: [
    BullModule.registerQueue({
      name: QUEUES.SEND_EMAIL,
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: JWT_COOKIE_SECRET,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
