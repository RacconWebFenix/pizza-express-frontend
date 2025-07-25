export interface Pedido {
  id: string;
  cliente: {
    id: string;
    nome: string;
    email: string;
    password?: string;
    telefone?: string;
    endereco?: string;
    createdAt?: string;
    updatedAt?: string;
  };

  pizzas: string[];
  total: number;
  status: "NOVO" | "EM_PREPARO" | "PRONTO_PARA_ENTREGA" | "FINALIZADO";
  horario: string;
}

