import { User } from "@/types/users";
import { getAuthToken } from "@/utils/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000";

/**
 * Busca os dados do perfil do usuário logado.
 */
export const getMyProfile = async (): Promise<User> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar os dados do perfil.");
  }
  return response.json();
};

/**
 * Atualiza os dados básicos do perfil do usuário (nome, email, telefone)
 */
export const updateBasicProfile = async (
  userId: number,
  data: { nome: string; email: string; telefone: string }
): Promise<User> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Falha ao atualizar o perfil.");
  }

  return response.json();
};

/**
 * Interface para dados de atualização do perfil
 */
export interface UpdateProfileData {
  nome: string;
  telefone: string;
  enderecos: Array<{
    id?: number;
    cep: string;
    tipo: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento?: string;
    principal: boolean;
  }>;
}

/**
 * Atualiza os dados do perfil do usuário
 */
export const updateUserProfile = async (
  data: UpdateProfileData
): Promise<User> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Falha ao atualizar o perfil.");
  }

  return response.json();
};

/**
 * Adiciona um novo endereço
 */
export const addAddress = async (
  addressData: Omit<UpdateProfileData["enderecos"][0], "id">
) => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addressData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Falha ao adicionar endereço.");
  }

  return response.json();
};
