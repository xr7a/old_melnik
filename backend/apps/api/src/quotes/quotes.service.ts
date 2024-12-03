import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { map } from 'rxjs/operators';
import * as FormData from "form-data"
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuotesService {
    constructor(
        private readonly http: HttpService,
        private readonly configService: ConfigService
    ) { }

    async uploadFile(file: Express.Multer.File) {
        const formData = new FormData();
        formData.append('file', file.buffer, file.originalname);
        formData.append('fileSize', file.size);

        const headers = formData.getHeaders();
        try {
            const response = await lastValueFrom(
                this.http.post(`${this.configService.get<string>('MINIO_API_URL')}files/upload`, formData, {
                    headers,
                }),
            );
            return response.data;
        } catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    }

    getFile(name: string) {
        try {
            return this.http.get(`${this.configService.get<string>('MINIO_API_URL')}files/file-url/${name}`)
                .pipe(
                    map(response => response.data)
                );
        } catch (error) {
            if (error.message.includes('not found')) {
                throw new NotFoundException('File doesn`t exist');
            }
            throw new InternalServerErrorException('Failed to retrieve file');
        }

    }

    async deleteFile(name: string) {
        await this.http.delete(`${this.configService.get<string>('MINIO_API_URL')}files/file-url/${name}`).toPromise()
            .catch(error => {
                if (error.message.includes('not found')) {
                    throw new NotFoundException('File doesn`t exist');
                }
                throw new InternalServerErrorException('Failed to retrieve file');
            });
        
    }
}
