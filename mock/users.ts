import { User } from "../types";

export const mockUsers: User[] = [
  {
    userId: 1,
    email: "admin@pizzaexpress.com",
    nome: "Administrador",
    telefone: "(11) 99999-9999",
    endereco: "Rua das Pizzas, 123 - São Paulo, SP",
  },
  {
    userId: 2,
    email: "cliente@teste.com",
    nome: "Cliente Teste",
    telefone: "(11) 88888-8888",
    endereco: "Av. Principal, 456 - São Paulo, SP",
  },
  {
    userId: 3,
    email: "manager@pizzaexpress.com",
    nome: "Gerente",
    telefone: "(11) 77777-7777",
    endereco: "Rua do Gerente, 789 - São Paulo, SP",
  },
];
