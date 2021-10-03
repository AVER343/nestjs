import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { JWT_COOKIE_SECRET, QUEUES } from 'config/constant';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { EmailModule } from './communication/email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    EmailModule,
    PrismaModule,
    UserModule,
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: JWT_COOKIE_SECRET,
      }),
      inject: [ConfigService],
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    SendGridModule.forRoot({
      apiKey:
        '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',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
