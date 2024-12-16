import { PrismaService } from '@app/db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PostService } from '../post/post.service';

@Injectable()
export class InteractionsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly postService: PostService
    ) { }

    async likePost(postId: string, userId: string) {
        const post = await this.postService.getPostById(postId);
        if (!post) {
            throw new NotFoundException("post doesn`t exist");
        }
        await this.prisma.like.create({
            data: {
                post: {
                    connect: { id: postId }
                },
                user: {
                    connect: { id: userId }
                }
            }
        })
    }


    async unlikePost(postId: string, userId: string){
        await this.prisma.like.delete({
            where: {
                postId_userId:{
                    postId: postId,
                    userId: userId
                }
             }
        });
    }

    async commentPost(postId: string, userId: string, content: string){
        const post = await this.postService.getPostById(postId);
        if (!post) {
            throw new NotFoundException("post doesn`t exist");
        }
        await this.prisma.comment.create({
            data: {
                content,
                post: {
                    connect: {id: postId}
                },
                user: {
                    connect: {id: userId}
                }
            }
        })
    }

    async deleteCommentPost(postId: string, userId: string){
        await this.prisma.comment.delete({
            where: {
                postId_userId:{
                    postId: postId,
                    userId: userId
                }
             }
        });
    } 
}
