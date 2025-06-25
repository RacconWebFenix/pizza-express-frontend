export interface MockPedido {
  id: string;
  pizzas: string[];
  total: number;
  status: "preparando" | "entregue" | "cancelado";
  data: string;
  hora: string;
}

export const mockPedidos: MockPedido[] = [
  {
    id: "1",
    pizzas: ["Pizza Margherita", "Pizza Pepperoni"],
    total: 65.9,
    status: "preparando",
    data: "2025-06-25",
    hora: "19:30",
  },
  {
    id: "2",
    pizzas: ["Pizza Quatri Queijos"],
    total: 42.5,
    status: "entregue",
    data: "2025-06-24",
    hora: "20:15",
  },
  {
    id: "3",
    pizzas: ["Pizza Calabresa", "Pizza Portuguesa", "Pizza Frango"],
    total: 89.7,
    status: "cancelado",
    data: "2025-06-23",
    hora: "18:45",
  },
];
