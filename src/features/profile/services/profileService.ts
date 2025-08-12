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

// No futuro, podemos adicionar aqui funções como updateUserProfile, addAddress, etc.
