import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startObservation } from './services/startObservation';
import { SiteStatusService } from './site-status/site-status.service';

//основной файл, который запускает бэк
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(); // need?

  // startObservation()
  const siteStatusService = app.get(SiteStatusService); // Получить экземпляр SiteStatusService

  startObservation(siteStatusService); // Вызвать функцию startObservation и передать зависимость
  await app.listen(3000);
}
bootstrap();
