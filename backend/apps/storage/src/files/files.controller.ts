import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { }

    @Get('buckets')
    bucketList() {
        return this.filesService.bucketList();
    }

    @Get('file-url/:name')
    async getFile(@Param('name') name: string) {
        return await this.filesService.getFile(name);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile('file') file: Express.Multer.File,) {
        return await this.filesService.uploadFile(file);
    }

    @Delete('file-url/:name')
    async deleteFile(@Param('name') name: string){
        console.log(name, 'зашел сюда')
        await this.filesService.deleteFile(name);
    }
}
