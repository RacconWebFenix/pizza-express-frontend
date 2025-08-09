// src/types/users.ts

import { Endereco } from "./endereco";

export enum Role {
  CLIENTE = "CLIENTE",
  FUNCIONARIO = "FUNCIONARIO",
  ADMIN = "ADMIN",
}

export interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  avatar: string | null;
  role: Role;
  enderecos?: Endereco[];
}
