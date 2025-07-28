import { Pizza } from "./pizza";

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

  pizzas: Pizza[];
  total: number;
  status: "novo" | "em preparo" | "entregue" | "cancelado";
  horario: string;
}
