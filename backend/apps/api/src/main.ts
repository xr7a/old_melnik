import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
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
    origin: '*',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
