import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCoffeeDto) {
    return this.coffeeService.create(dto);
  }

  @Get()
  findAll() {
    return this.coffeeService.findAll();
  }

  @Get('plus-order-coffee')
  findMaisVendidos() {
    return this.coffeeService.findMaisVendidos();
  }

  @Get(':id/order')
  findPedidosByCafeId(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.findPedidosByCafeId(id);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.findById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.remove(id);
  }
}
