import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AccessTokenStrategy } from '../auth/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../auth/strategies/refreshToken.strategy';
import { RoleGuard } from '../auth/guards/role.guard';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [QuotesService, AccessTokenStrategy, RefreshTokenStrategy, RoleGuard],
  exports: [QuotesService]
})
export class QuotesModule { }
