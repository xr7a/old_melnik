import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { ConfigModule } from '@nestjs/config';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mymyoldmelnik123',
      signOptions: { expiresIn: '2h' }
    }),
    UserModule,
    ConfigModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, RoleGuard]
})
export class AuthModule { }
