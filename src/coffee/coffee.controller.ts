import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  // POST /coffees
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCoffeeDto) {
    return this.coffeeService.create(dto);
  }

  // GET /coffees
  @Get()
  getAll() {
    return this.coffeeService.findAll();
  }

  // GET /coffees/:id
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.coffeeService.findById(Number(id));
  }
}