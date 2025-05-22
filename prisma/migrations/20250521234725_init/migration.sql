-- CreateTable
CREATE TABLE "Coffee" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "quantidade" INTEGER,
    "preco" DOUBLE PRECISION,
    "descricao" TEXT,
    "tags" TEXT[],

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);
