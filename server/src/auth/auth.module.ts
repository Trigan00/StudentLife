import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './jwt-auth.guards';
import { MailModule } from 'src/mail/mail.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
  imports: [UsersModule, MailModule, TokenModule],
})
export class AuthModule {}
