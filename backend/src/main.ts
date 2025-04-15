import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:8080'], // Your React dev server
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization', 'Set-Cookie'],
  });
  app.setGlobalPrefix('api/v1');
  app.use('/api/v1/payments/webhook', bodyParser.raw({ type: '*/*' }));
  app.use(json());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
