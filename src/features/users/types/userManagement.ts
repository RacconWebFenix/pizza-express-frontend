// src/features/users/types/userManagement.ts

import { Role, User } from "@/types/users";

export interface UserFilters {
  role?: Role;
  search?: string;
  status?: 'active' | 'inactive';
}

export interface UserFormData {
  nome: string;
  email: string;
  telefone: string;
  role: Role;
}

export interface UserCreationData extends UserFormData {
  password: string;
}

export interface UsersListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface UserTableItem {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  role: Role;
  createdAt: string;
}