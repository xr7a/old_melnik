import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(StorageModule);
  const config = new DocumentBuilder()
  .setTitle('Old-melnik')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT', // Это необязательно, но полезно
    },
    'access-token', // Название схемы
  )
  .build()
const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('swagger', app, document)
  await app.listen(process.env.port ?? 3005);
}
bootstrap();
