import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NATS_SERVERS } from 'src/config/service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(NATS_SERVERS) private readonly client: ClientProxy
  ){}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'find_one_product' }, { id })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {

    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'update_product' }, {
          id,
          ...updateProductDto
        })
      );
    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'remove_product' }, { id })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
