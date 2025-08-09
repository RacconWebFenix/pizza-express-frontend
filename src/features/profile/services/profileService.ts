import { User } from "@/types/users";
import { getAuthToken } from "@/utils/cookies";

// Assumindo que o auth-service agora está em /lib ou /features/auth

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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
  // O backend retorna os dados do usuário diretamente neste endpoint
  return response.json();
};

// No futuro, podemos adicionar aqui funções como updateUserProfile, addAddress, etc.
