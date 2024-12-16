import { Injectable } from '@nestjs/common';
import * as Minio from "minio"
import { InjectMinio } from '../minio/decorator/minio.decorator';
import { rejects } from 'assert';
import { randomUUID } from 'crypto';

@Injectable()
export class FilesService {
    protected _bucketName = 'main';
    constructor(@InjectMinio() private readonly minioService: Minio.Client) { }

    async bucketList() {
        return await this.minioService.listBuckets();
    }

    async getFile(filename: string) {
        return await this.minioService.presignedUrl(
            'GET',
            this._bucketName,
            filename,
        );
    }

    async uploadFile(file: Express.Multer.File) {
        const filename = `${randomUUID().toString()}-${file.originalname}`;
        await this.minioService.putObject(
            this._bucketName,
            filename,
            file.buffer,
            file.size,
        )
        return filename;
    }

    async deleteFile(filename: string) {
        return await this.minioService.removeObject(
            this._bucketName,
            filename
        )
    }
}
