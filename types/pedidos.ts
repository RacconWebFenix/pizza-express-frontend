export interface Pedido {
  id: string;
  cliente: string;
  pizzas: string[];
  total: number;
  status: string;
  horario: string;
}
