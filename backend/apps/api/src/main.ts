import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync(path.join(__dirname, '..', 'certificates', 'server.key')),
  //   cert: fs.readFileSync(path.join(__dirname, '..', 'certificates', 'server.cert')),
  // }
  const app = await NestFactory.create(AppModule);

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
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
