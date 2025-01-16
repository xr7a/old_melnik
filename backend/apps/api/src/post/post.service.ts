import { PrismaService } from '@app/db';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Req } from '@nestjs/common';
import { createPostDto, updatePostDto } from './dto/post.dto';
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
            where: { id },
            include: {
                image: true,
                likes: true,
                comments: true
            }
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
            where: { id },
            include: { image: true }
        });
        if (post == null) {
            throw new NotFoundException('post doesn`t exist');
        }

        if (post.image != null) {
            await this.prisma.post.update({
                where: { id },
                data: {
                    image: {
                        delete: true
                    }
                }
            })
        }
        const imageMinio = await this.quotes.uploadFile(image);
        console.log('imageMinio:', imageMinio);
        const url = await this.getImageToPost(imageMinio);
        console.log(url)
        const newPost = await this.prisma.post.update({
            where: { id },
            data: {
                image: {
                    create: {
                        imageUrl: url
                    }
                }
            },
            include: {
                image: true
            }
        })
        return newPost.image;
    }

    async getImageToPost(image) {
        return this.quotes.getFile(image);
    }

    async deleteImageFromPost(postId: string, name: string) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            include: { image: true }
        });

        if (!post.image.imageUrl) {
            console.log('вот щас')
            throw new BadRequestException('Image doesn`t exist in this post');
        }
        if (!post) {
            throw new NotFoundException("post doesn`t exist");
        }
        await this.quotes.deleteFile(post.image.imageUrl);
        await this.prisma.post.update({
            where: { id: postId },
            data: {
                image: {
                    delete: true
                }
            }
        }
        )
    }

    async GetPublishedPosts(offset: number, limit: number) {
        return await this.prisma.post.findMany({
            take: limit,
            skip: offset,
            where: {
                status: "Published"
            },
            include: {
                image: true,
                likes: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }

        });
    }

    async GetAuthorsPublishedPosts(id: string, offset: number, limit: number) {
        return await this.prisma.post.findMany({
            take: limit,
            skip: offset,
            where: {
                authorId: id,
                status: 'Published'
            },
            include: {
                image: true,
                likes: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async GetAuthorsDraftPosts(id: string, offset: number, limit: number) {
        return await this.prisma.post.findMany({
            take: limit,
            skip: offset,
            where: {
                authorId: id,
                status: 'Draft'
            },
            include: {
                image: true,
                likes: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
}
