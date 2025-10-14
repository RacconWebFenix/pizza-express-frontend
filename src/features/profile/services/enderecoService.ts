import { getAuthToken } from "@/utils/cookies";
import type { Endereco } from "@/types/endereco";
import { getMyProfile } from "./profileService";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000";

/**
 * Interface para criação de endereço
 */
export interface CreateEnderecoData {
  cep: string;
  tipo: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string;
  principal: boolean;
}

/**
 * Interface para atualização de endereço
 */
export interface UpdateEnderecoData {
  cep?: string;
  tipo?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  complemento?: string;
  principal?: boolean;
}

/**
 * Busca todos os endereços do usuário
 */
export const getEnderecos = async (): Promise<Endereco[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/enderecos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    // Fallback: se a rota /enderecos não existir, busca via /me
    if (response.status === 404) {
      try {
        const profile = await getMyProfile();
        return profile.enderecos || [];
      } catch {
        throw new Error("Falha ao buscar endereços.");
      }
    }
    throw new Error("Falha ao buscar endereços.");
  }
  const result = await response.json();
  return result.data; // Extrair apenas o array de endereços
};

/**
 * Busca um endereço específico por ID (simulado a partir dos endereços do usuário)
 */
export const getEnderecoById = async (
  enderecoId: number
): Promise<Endereco> => {
  try {
    const enderecos = await getEnderecos();
    const endereco = enderecos.find((e) => e.id === enderecoId);
    if (!endereco) {
      throw new Error("Endereço não encontrado.");
    }
    return endereco;
  } catch {
    throw new Error("Falha ao buscar endereço.");
  }
};

/**
 * Cria um novo endereço
 */
export const createEndereco = async (
  data: CreateEnderecoData
): Promise<Endereco> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  // Usar a rota correta do backend /enderecos
  const response = await fetch(`${API_URL}/enderecos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Falha ao criar endereço.");
  }

  return response.json();
};

/**
 * Atualiza um endereço existente
 */
export const updateEndereco = async (
  enderecoId: number,
  data: UpdateEnderecoData
): Promise<Endereco> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/enderecos/${enderecoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Falha ao atualizar endereço.");
  }

  return response.json();
};

/**
 * Remove um endereço
 */
export const deleteEndereco = async (enderecoId: number): Promise<void> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/enderecos/${enderecoId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Falha ao remover endereço.");
  }
};
