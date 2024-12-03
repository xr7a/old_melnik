import { PrismaService } from '@app/db';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Req } from '@nestjs/common';
import { createPostDto, updatePostDto } from './dto/post.dto';
import { Request } from 'express';
import { QuotesService } from '../quotes/quotes.service';

@Injectable()
export class PostService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly quotes: QuotesService
    ) { }

    async create(id: string, { title, content }: createPostDto) {
        return await this.prisma.post.create({
            data: {
                title,
                content,
                status: "Draft",
                author: {
                    connect: { id }
                },
            }
        })
    }

    async update(id: string, post: updatePostDto) {
        const existPost = await this.getPostById(id);
        if (!existPost) {
            throw new NotFoundException('Post doesn`t exist');
        }
        return await this.prisma.post.update({
            where: { id },
            data: post
        })
    }

    async getPostById(id: string) {
        return await this.prisma.post.findUnique({
            where: { id }
        })
    }

    async publish(id: string) {
        const existPost = await this.getPostById(id);
        if (!existPost) {
            throw new NotFoundException('Post doesn`t exist');
        }
        return await this.prisma.post.update({
            where: { id },
            data: { status: 'Published' }
        })
    }

    async addImageToPost(image: Express.Multer.File, id: string) {
        const post = await this.prisma.post.findUnique({
            where: {id},
            include: {images: true}
        });
        if(!post){
            throw new NotFoundException('post doesn`t exist');
        }
        const imageMinio = await this.quotes.uploadFile(image);
        await this.prisma.post.update({
            where: { id },
            data: {
                images: {
                    create: {
                        imageUrl: imageMinio
                    }
                }
            }
        })
        return imageMinio;
    }

    async getImageToPost(postId: string, name: string) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId }
        });
        if (!post) {
            throw new NotFoundException("post doesn`t exist");
        }
        return this.quotes.getFile(name);
    }

    async deleteImageFromPost(postId: string, name: string) {
        const post = await this.prisma.post.findUnique({
            where: {id: postId},
            include: {images: true}
        });
        
        if(!post.images.every(index => {index.imageUrl != name})) {
            console.log('вот щас')
            throw new BadRequestException('Image doesn`t exist in this post');
        }
        if (!post) {
            throw new NotFoundException("post doesn`t exist");
        }
        await this.quotes.deleteFile(name);
        await this.prisma.post.update({
            where: {id: postId},
            data: {
                images: {
                    delete: {
                        imageUrl: name
                    }
                }
            }
        })
    }

    async GetPublishedPosts() {
        return await this.prisma.post.findMany({
            where: {
                status: "Published"
            }
        });
    }

    async GetAuthorsPosts(id: string){
        return await this.prisma.post.findMany({
            where: {authorId: id}
        });
    }


}
