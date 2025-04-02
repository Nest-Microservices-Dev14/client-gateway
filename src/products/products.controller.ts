import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

@Controller('products')
export class ProductsController {

  @Post()
  create() {
    return `creación del producto`;
  }

  @Get()
  findAll() {
    return 'obtener los productos';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `obtener el producto por Id ${id}`;
  }

  @Patch(':id')
  update() {
    return `actualizar productos`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Eliminar producto por Id ${id}`;
  }
}
