import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main client-gateway');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  await app.listen(envs.PORT);
  logger.log(`Products Microservice Running on port ${ envs.PORT }`);
}
bootstrap();
