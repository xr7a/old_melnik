import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { Request } from 'express';
import { Roles } from '../auth/guards/role.guard';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('interactions')
export class InteractionsController {
    constructor(private readonly interactionsService: InteractionsService) { }

    @Roles('Author', 'Reader')
    @UseGuards(AccessTokenGuard)
    @Post(":postId/like")
    async LikePost(@Param('postId') postId: string, @Req() req: Request) {
        await this.interactionsService.likePost(postId, req.user['id']);
    }

    @Roles('Author', 'Reader')
    @UseGuards(AccessTokenGuard)
    @Post(":postId/comment")
    async CommentPost(@Param('postId') postId: string, @Req() req: Request, @Param('content') content: string) {
        await this.interactionsService.commentPost(postId, req.user['id'], content)
    }

    @Roles('Author', 'Reader')
    @UseGuards(AccessTokenGuard)
    @Delete(":postId/like")
    async UnLikePost(@Param('postId') postId: string, @Req() req: Request) {
        await this.interactionsService.unlikePost(postId, req.user['id'])
    }

    @Roles('Author', 'Reader')
    @UseGuards(AccessTokenGuard)
    @Delete(":postId/comment")
    async UnCommentPost(@Param('postId') postId: string, @Req() req: Request) {
        await this.interactionsService.deleteCommentPost(postId, req.user['id'])
    }
}
