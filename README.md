# ☕ CoffeeDelivery API

API RESTful desenvolvida com **NestJS**, **Prisma ORM** e **PostgreSQL (NeonDB)** para gerenciamento de cafés. Permite cadastrar novos cafés e consultar detalhes por ID.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL (NeonDB)](https://neon.tech/)
- [TypeScript](https://www.typescriptlang.org/)
- [class-validator](https://github.com/typestack/class-validator)

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone 
cd Coffe-Delivery-API
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` com a string de conexão:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@HOST/neondb?sslmode=require"
```

---

## 🛠️ Banco de Dados

### Rodar as migrations

```bash
npm install ts-node --save-dev
```

### Executar o seed com dados iniciais

```bash
npx prisma db seed
```
---

## ▶️ Rodando a Aplicação

```bash
npm run start:dev
```

A aplicação estará disponível em:  
📍 **http://localhost:3000**

---

## 📌 Endpoints

### GET `/coffes/:id/detalhes`

- Busca os detalhes de um café pelo seu ID.
- Retorna erro 404 caso o ID não exista.

### POST `/coffee-create`

- Cria um novo café.
- Campos obrigatórios: `nome`, `tipo`, `id`.

---

## 🧼 Resetar a Base de Dados

Durante o desenvolvimento, você pode limpar os dados usando:

```ts
await prisma.aluno.deleteMany();
await prisma.classeDeAula.deleteMany();
```

Essas instruções já estão inclusas no arquivo `prisma/seed.ts`.