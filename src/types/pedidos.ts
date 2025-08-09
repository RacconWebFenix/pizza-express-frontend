import { Pizza, User } from ".";
import { Endereco } from "./endereco";


// Enum para os status do pedido, deve ser idêntico ao do backend
export enum StatusPedido {
  PENDENTE = "PENDENTE",
  EM_PREPARO = "EM_PREPARO",
  A_CAMINHO = "A_CAMINHO",
  ENTREGUE = "ENTREGUE",
  CANCELADO = "CANCELADO",
}

// Objeto para configurar a aparência de cada status (cores do Chakra UI)
export const statusConfig: Record<
  StatusPedido,
  { label: string; colorScheme: string }
> = {
  [StatusPedido.PENDENTE]: { label: "Pendente", colorScheme: "gray" },
  [StatusPedido.EM_PREPARO]: { label: "Em Preparo", colorScheme: "yellow" },
  [StatusPedido.A_CAMINHO]: { label: "A Caminho", colorScheme: "blue" },
  [StatusPedido.ENTREGUE]: { label: "Entregue", colorScheme: "green" },
  [StatusPedido.CANCELADO]: { label: "Cancelado", colorScheme: "red" },
};

export interface Pedido {
  id: number;
  user: User;
  userId: number;
  endereco: Endereco;
  enderecoId: number;
  pizzas: Pizza[];
  status: StatusPedido; // Tipo atualizado para o enum
  entregador?: Entregador;
  entregadorId?: number;
  latitude?: number;
  longitude?: number;
  criadoEm: string;
  atualizadoEm: string;
}
