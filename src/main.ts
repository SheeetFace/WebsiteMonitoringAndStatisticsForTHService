import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//основной файл, который запускает бэк
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(); // need?
  await app.listen(3000);
}
bootstrap();
