import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config/service';
import { envs } from 'src/config/envs';

@Module({
  controllers: [ProductsController],
  imports: [
    ClientsModule.register([
      { 
        name: PRODUCT_SERVICE, 
        transport: Transport.TCP,
        options: {
          port: envs.productsMicroservicePort,
          host: envs.productsMicroserviceHost
        }
      }
    ])
  ]
})
export class ProductsModule {}
