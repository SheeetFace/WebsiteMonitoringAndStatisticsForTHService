import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startObservation } from './services/startObservation';
import { SiteStatusService } from './site-status/site-status.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const port = process.env.PORT || 3001;

  const siteStatusService = app.get(SiteStatusService)

  startObservation(siteStatusService)
  
  await app.listen( port, "0.0.0.0"); 
}
bootstrap();

//! fly apps restart "название из .toml"
