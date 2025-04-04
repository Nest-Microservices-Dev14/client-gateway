import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config/service';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StatusDto } from './dto/status-dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersClient.send('findAllOrders', paginationDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id })
      )
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(@Query() paginationDto: PaginationDto, @Param() statusDto: StatusDto ) {
    return this.ordersClient.send('findAllOrders', {
      ...paginationDto,
      status: statusDto.status
    });
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ){
    return this.ordersClient.send('changeOrderStatus', {
      id,
      status: statusDto.status
    });
  }

}
