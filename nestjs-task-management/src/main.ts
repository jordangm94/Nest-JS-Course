import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //global pipe, will be applied to every route handler, //whenever you run validation decorator, run validation pipe
  await app.listen(3000);
}
bootstrap();
