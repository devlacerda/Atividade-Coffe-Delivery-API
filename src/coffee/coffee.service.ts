import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeeService {
  constructor(private readonly prisma: PrismaService) {}

  // Cria um novo café com tags
  async create(data: CreateCoffeeDto) {
    return this.prisma.cafe.create({
      data: {
        nome: data.nome,
        tipo: data.tipo,
        preco: data.preco,
        descricao: data.descricao,
        tags: {
          create: data.tags,
        },
      },
      include: {
        tags: true,
      },
    });
  }

  // Busca todos os cafés
  async findAll() {
    return this.prisma.cafe.findMany({
      include: { tags: true },
    });
  }

  // Busca um café por ID
  async findById(id: number) {
    const cafe = await this.prisma.cafe.findUnique({
      where: { id },
      include: {
        tags: true,
        itensPedido: {
          include: {
            pedido: {
              include: {
                cliente: true,
                entrega: true,
              },
            },
          },
        },
      },
    });
  
    if (!cafe) {
      throw new NotFoundException(`Café com ID ${id} não encontrado.`);
    }
  
    return cafe;
  }
  
}