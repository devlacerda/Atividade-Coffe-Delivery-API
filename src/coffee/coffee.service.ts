import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCoffeeDto) {
    return this.prisma.cafe.create({
      data: {
        nome: data.nome,
        tipo: data.tipo,
        preco: data.preco,
        descricao: data.descricao,
        tags: {
          create: data.tags.map(tag => ({ nome: tag })),
        },
      },
      include: {
        tags: true,
      },
    });
  }

  async findAll() {
    const cafes = await this.prisma.cafe.findMany({
      include: { tags: true },
    });

    return cafes.map(cafe => ({
      id: cafe.id,
      nome: cafe.nome,
      tags: cafe.tags.map(tag => tag.nome),
    }));
  }

  async findById(id: number) {
    const cafe = await this.prisma.cafe.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!cafe) {
      throw new NotFoundException(`Café com ID ${id} não encontrado.`);
    }

    return cafe;
  }

  async findPedidosByCafeId(cafeId: number) {
    const pedidos = await this.prisma.itemPedido.findMany({
      where: { cafeId },
      include: {
        pedido: {
          include: { cliente: true },
        },
      },
    });

    return pedidos.map(item => ({
      cliente: item.pedido.cliente.nome,
      email: item.pedido.cliente.email,
      quantidade: item.quantidade,
    }));
  }

  async findMaisVendidos(nome?: string, tipo?: string) {
    const result = await this.prisma.itemPedido.groupBy({
      by: ['cafeId'],
      _sum: {
        quantidade: true,
      },
      orderBy: {
        _sum: {
          quantidade: 'desc',
        },
      },
      take: 3,
    });

    const whereClause: any = {
      id: {
        in: result.map(r => r.cafeId),
      },
    };

    if (nome) {
      whereClause.nome = { contains: nome, mode: 'insensitive' };
    }

    if (tipo) {
      whereClause.tipo = { contains: tipo, mode: 'insensitive' };
    }

    const cafes = await this.prisma.cafe.findMany({
      where: whereClause,
      include: { tags: true },
    });

    return cafes.map(cafe => {
      const total = result.find(r => r.cafeId === cafe.id)?._sum.quantidade || 0;
      return {
        nome: cafe.nome,
        tipo: cafe.tipo,
        totalComprado: total,
      };
    });
  }

  async remove(id: number) {
    const cafe = await this.prisma.cafe.findUnique({
      where: { id },
    });

    if (!cafe) {
      throw new NotFoundException(`Café com ID ${id} não encontrado.`);
    }

    await this.prisma.tagCafe.deleteMany({
      where: { cafeId: id },
    });

    await this.prisma.cafe.delete({
      where: { id },
    });

    return { message: `Café com ID ${id} deletado com sucesso.` };
  }
}
