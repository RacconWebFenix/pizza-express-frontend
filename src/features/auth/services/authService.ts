// src/features/auth/services/authService.ts

import { User } from "@/types/users";
import { API_BASE_URL } from "@/config/api";

const API_URL = API_BASE_URL;

interface LoginCredentials {
  email: string;
  password: string;
}
interface LoginResponse {
  access_token: string;
  user: User;
}

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    let errorMessage = "Credenciais inválidas.";
    try {
      const errorData = await response.json();
      errorMessage =
        errorData?.message || errorData?.error || "Credenciais inválidas.";
    } catch {
      // Mantém a mensagem padrão se não conseguir parsear
    }

    throw new Error(errorMessage);
  }
  return response.json();
};

export const getMe = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(
      "Falha ao buscar dados do usuário. O token pode ser inválido."
    );
  }
  return response.json();
};

// URL para iniciar o login com Google
export const getGoogleSignInUrl = (): string => {
  return `${API_URL}/auth/google`;
};
