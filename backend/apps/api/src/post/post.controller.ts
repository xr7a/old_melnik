import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors, ValidationPipe, UsePipes } from '@nestjs/common';
import { PostService } from './post.service';
import { createPostDto, updatePostDto } from './dto/post.dto';
import { query, Request } from 'express';
import { Roles } from '../auth/guards/role.guard';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from './dto/pagination.dto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Roles('Author')
    @UseGuards(AccessTokenGuard)
    @Post()
    async CreatePost(@Req() req: Request, @Body() createPostDto: createPostDto) {
        return await this.postService.create(req.user['id'], createPostDto);
    }

    @Roles('Author')
    @UseGuards(AccessTokenGuard)
    @Post(':postId/images')
    @UseInterceptors(FileInterceptor('file'))
    async AddImageToPost(@UploadedFile('file') image: Express.Multer.File, @Param('postId') postId: string) {
        console.log(image);
        return await this.postService.addImageToPost(image, postId);
    }

    @Roles('Author')
    @UseGuards(AccessTokenGuard)
    @Delete(':postId/images/:imageId')
    async DeleteImageFromPost(@Param('postId') postId: string, @Param('imageId') imageId: string) {
        await this.postService.deleteImageFromPost(postId, imageId);
    }

    @Roles('Author')
    @UseGuards(AccessTokenGuard)
    @Put(':postId')
    async updatePost(@Param('postId') postId: string, updatePostDto: updatePostDto) {
        return await this.postService.update(postId, updatePostDto);
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @Roles("Reader", "Author")
    @UseGuards(AccessTokenGuard)
    @Get()
    async GetPublishedPosts(@Query() query: PaginationDto) {
        const {page = 1, limit = 10} = query;
        const offset = (page - 1) * limit;
        return await this.postService.GetPublishedPosts(offset, limit);
    }


    @UsePipes(new ValidationPipe({ transform: true }))
    @Roles("Author")
    @UseGuards(AccessTokenGuard)
    @Get("/my/published")
    async GetAuthorsPublishedPosts(@Query() query: PaginationDto, @Req() req: Request) {
        const {page = 1, limit = 10} = query;
        const offset = (page - 1) * limit;
        return await this.postService.GetAuthorsPublishedPosts(req.user['id'], offset, limit);
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @Roles("Author")
    @UseGuards(AccessTokenGuard)
    @Get("/my/draft")
    async GetAuthorsDraftPosts(@Query() query: PaginationDto, @Req() req: Request) {
        const {page = 1, limit = 10} = query;
        const offset = (page - 1) * limit;
        return await this.postService.GetAuthorsDraftPosts(req.user['id'], offset, limit);
    }

    @Roles("Author")
    @UseGuards(AccessTokenGuard)
    @Post(':postId/publish')
    async PublishPost(id: string){
        return await this.postService.publish(id);
    }


}
