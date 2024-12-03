import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from '@app/db';
import { PostModule } from './post/post.module';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    PostModule,
    QuotesModule,
  ],
})
export class AppModule { }
