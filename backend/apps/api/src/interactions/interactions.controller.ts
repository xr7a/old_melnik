import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { Request } from 'express';

@Controller('interactions')
export class InteractionsController {
    constructor(private readonly interactionsService: InteractionsService) { }

    @Post(":postId/like")
    async LikePost(@Param('postId') postId: string, @Req() req: Request) {
        await this.interactionsService.likePost(postId, req.user['id']);
    }

    @Post(":postId/comment")
    async CommentPost(@Param('postId') postId: string, @Req() req: Request, @Param('content') content: string) {
        await this.interactionsService.commentPost(postId, req.user['id'], content)
    }

    @Delete(":postId/like")
    async UnLikePost(@Param('postId') postId: string, @Req() req: Request){
        await this.interactionsService.unlikePost(postId, req.user['id'])
    }

    @Delete(":postId/comment")
    async UnCommentPost(@Param('postId') postId: string, @Req() req: Request){
        await this.interactionsService.deleteCommentPost(postId, req.user['id'])
    }
}
