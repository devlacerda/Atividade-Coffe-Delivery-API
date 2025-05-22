import { Body, Controller, Get, Param, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller()
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Post('coffee-create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Get('coffes/:id/detalhes')
  getById(@Param('id') id: string) {
    return this.coffeeService.findById(id);
  }
}
