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
  Query,
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

  @Post('coffee-create')
  @HttpCode(HttpStatus.CREATED)
  async createCustom(@Body() dto: CreateCoffeeDto) {
    const cafe = await this.coffeeService.create(dto);
    return {
      message: 'Café criado com sucesso',
      cafe,
    };
  }

  @Get()
  findAll() {
    return this.coffeeService.findAll();
  }

  @Get(':id/detalhes')
  async getDetalhes(@Param('id', ParseIntPipe) id: number) {
    const cafe = await this.coffeeService.findById(id);
    return {
      id: cafe.id,
      nome: cafe.nome,
      tipo: cafe.tipo,
      preco: cafe.preco,
      descricao: cafe.descricao,
      tags: cafe.tags.map(tag => tag.nome),
    };
  }

  @Get('plus-order-coffee')
  findMaisVendidos(
    @Query('nome') nome?: string,
    @Query('tipo') tipo?: string,
  ) {
    return this.coffeeService.findMaisVendidos(nome, tipo);
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
