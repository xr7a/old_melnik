import { Module } from '@nestjs/common';
import { MinioModule } from './minio/minio.module';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }), 
      MinioModule, 
      FilesModule]
})
export class StorageModule {}
