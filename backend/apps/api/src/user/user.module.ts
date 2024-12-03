import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '@app/db';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
