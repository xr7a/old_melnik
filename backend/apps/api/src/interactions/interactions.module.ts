import { Module } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  providers: [InteractionsService],
  controllers: [InteractionsController]
})
export class InteractionsModule {}
