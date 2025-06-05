import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Apaga dados existentes na ordem correta
  await prisma.entrega.deleteMany();
  await prisma.itemPedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.tagCafe.deleteMany();
  await prisma.cafe.deleteMany();
  await prisma.cliente.deleteMany();

  // Cria café
  const cafe = await prisma.cafe.create({
    data: {
      nome: 'Paraíso',
      tipo: 'Forte',
      preco: 25.6,
      descricao: 'Café encorpado com notas intensas de cacau e aroma marcante.',
      tags: {
        create: [
          { nome: 'intenso' },
          { nome: 'cacau' },
          { nome: 'tradicional' },
        ],
      },
    },
  });

  // Cria cliente
  const cliente = await prisma.cliente.create({
    data: {
      nome: 'João Silva',
      email: 'joao@email.com',
      cpf: '12345678900',
      telefone: '11999999999',
    },
  });

  // Cria pedido e entrega
  await prisma.pedido.create({
    data: {
      clienteId: cliente.id,
      total: 51.2,
      itens: {
        create: [
          {
            cafeId: cafe.id,
            quantidade: 2,
            preco: 25.6,
          },
        ],
      },
      entrega: {
        create: {
          endereco: 'Rua das Rosas, 100',
          status: 'PENDENTE',
          dataPrevista: new Date(Date.now() + 3 * 86400000), // 3 dias no futuro
        },
      },
    },
  });

  console.log('✅ Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());