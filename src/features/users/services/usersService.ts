// src/features/users/services/usersService.ts

import { User } from "@/types/users";
import { getAuthToken } from "@/utils/cookies";
import { UserCreationData, UserFilters } from "../types/userManagement";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Helper para criar cabeçalhos de autenticação
 */
const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Busca todos os usuários com filtros opcionais
 */
export const getUsers = async (filters?: UserFilters): Promise<User[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const queryParams = new URLSearchParams();
  if (filters?.role) queryParams.append("role", filters.role);
  if (filters?.search) queryParams.append("search", filters.search);

  const url = `${API_URL}/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao buscar usuários.");
  }

  const result = await response.json();
  return result.data || result; // Ajustar conforme resposta da API
};

/**
 * Busca um usuário específico por ID
 */
export const getUserById = async (id: number): Promise<User> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao buscar usuário.");
  }

  const result = await response.json();
  return result.data || result;
};

/**
 * Cria um novo usuário (apenas ADMIN)
 */
export const createUser = async (data: UserCreationData): Promise<User> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao criar usuário.");
  }

  const result = await response.json();
  return result.data || result;
};

/**
 * Atualiza um usuário existente
 */
export const updateUser = async (id: number, data: Partial<UserCreationData>): Promise<User> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao atualizar usuário.");
  }

  const result = await response.json();
  return result.data || result;
};

/**
 * Remove um usuário (apenas ADMIN)
 */
export const deleteUser = async (id: number): Promise<void> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao deletar usuário.");
  }
};