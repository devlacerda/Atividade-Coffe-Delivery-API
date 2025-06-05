export class CoffeeEntity {
  id: number;
  nome: string;
  tipo: string;
  preco: number;
  descricao: string;
  tags: { id: number; nome: string }[];
  itensPedido: {
    id: number;
    quantidade: number;
    preco: number;
    pedido: {
      id: number;
      data: Date;
      total: number;
      cliente: {
        id: number;
        nome: string;
        email: string;
        cpf: string;
        telefone: string;
      };
      entrega: {
        id: number;
        endereco: string;
        status: string;
        dataPrevista: Date;
      } | null;
    };
  }[];
}