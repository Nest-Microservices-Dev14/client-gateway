import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config/service';
import { envs } from 'src/config/envs';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      { 
        name: ORDER_SERVICE, 
        transport: Transport.TCP,
        options: {
          port: envs.ordersMicroservicePort,
          host: envs.ordersMicroserviceHost
        }
      }
    ])
  ],
  providers: [],
})
export class OrdersModule {}
