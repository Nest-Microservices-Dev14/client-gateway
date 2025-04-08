import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVERS } from 'src/config/service';
import { envs } from 'src/config/envs';

@Module({
  controllers: [ProductsController],
  imports: [
    ClientsModule.register([
      { 
        name: NATS_SERVERS, 
        transport: Transport.NATS,
        options: {
          servers: envs.natsServer
        }
      }
    ])
  ]
})
export class ProductsModule {}
