import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.coffee.deleteMany();

  const cafes = [
    {
      id: '22',
      nome: 'Paraíso',
      tipo: 'Forte',
      quantidade: 2,
      preco: 25.6,
      descricao: 'Café encorpado com notas intensas de cacau e aroma marcante.',
      tags: ['intenso', 'cacau', 'tradicional'],
    },
    {
      id: '30',
      nome: 'Encanto',
      tipo: 'Suave',
      quantidade: 2,
      preco: 22.0,
      descricao: 'Bebida delicada com notas florais e toque de frutas vermelhas.',
      tags: ['floral', 'frutas vermelhas', 'suave'],
    },
    {
      id: '15',
      nome: 'Aurora',
      tipo: 'Médio',
      quantidade: 5,
      preco: 18.5,
      descricao: 'Café equilibrado com notas de caramelo e leve acidez.',
      tags: ['caramelo', 'equilibrado'],
    },
  ];

  for (const cafe of cafes) {
    await prisma.coffee.upsert({
      where: { id: cafe.id },
      update: {},
      create: cafe,
    });
  }

  console.log('🌱 Seed executada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
