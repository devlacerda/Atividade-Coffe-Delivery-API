import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeeService {
  constructor(private prisma: PrismaService) {}

  async create(createCoffeeDto: CreateCoffeeDto) {
    const cafe = await this.prisma.coffee.create({
      data: createCoffeeDto,
    });

    return {
      message: 'Café criado com sucesso',
      cafe,
    };
  }

  async findById(id: string) {
    const cafe = await this.prisma.coffee.findUnique({ where: { id } });
    if (!cafe) {
      throw new NotFoundException('Café não encontrado');
    }
    return cafe;
  }
}
