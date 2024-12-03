import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { createPostDto, updatePostDto } from './dto/post.dto';
import { Request } from 'express';
import { Roles } from '../auth/guards/role.guard';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { FileInterceptor } from '@nestjs/platform-express';

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

    @Delete(':postId/images/:imageId')
    async DeleteImageFromPost(@Param('postId') postId: string, @Param('imageId') imageId: string){
        await this.postService.deleteImageFromPost(postId, imageId);
    }

    @Roles('Author')
    @UseGuards(AccessTokenGuard)
    @Put(':postId')
    async updatePost(@Param('postId') postId: string, updatePostDto: updatePostDto) {
        return await this.postService.update(postId, updatePostDto);
    }

    @Roles("Reader")
    @UseGuards(AccessTokenGuard)
    @Get()
    async GetPosts() {
        return await this.postService.GetPublishedPosts();
    }

    @Roles("Author")
    @UseGuards(AccessTokenGuard)
    @Get()
    async GetAuthorsPosts(@Req() req: Request) {
        return await this.postService.GetAuthorsPosts(req.user['id']);
    }

    
}
