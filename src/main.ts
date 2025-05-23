import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';

async function bootstrap() {
  const logger = new Logger('Main client-gateway');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api', {
    exclude: [{
      path: '',
      method: RequestMethod.GET
    }]
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  console.log('Kubernetes-GCloud');

  app.useGlobalFilters( new RpcCustomExceptionFilter());

  await app.listen(envs.PORT);
  logger.log(`Client Microservice Running on port ${ envs.PORT }`);
}
bootstrap();