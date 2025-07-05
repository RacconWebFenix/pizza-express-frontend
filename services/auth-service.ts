/**
 * Serviço de Autenticação
 *
 * Centraliza todas as operações de autenticação
 * Integra com o backend e gerencia tokens
 */

import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface User {
  userId: number;
  email: string;
  name?: string;
}

export interface AuthResponse {
  access_token: string;
  user?: User;
}

/**
 * Realizar login
 */
export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  if (!API_URL) {
    throw new Error("URL da API não configurada");
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Erro no login. Verifique suas credenciais."
    );
  }

  const data = await response.json();
  return data;
};

/**
 * Registrar novo usuário
 */
export const registerUser = async (
  userData: RegisterData
): Promise<AuthResponse> => {
  if (!API_URL) {
    throw new Error("URL da API não configurada");
  }

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro no registro. Tente novamente.");
  }

  const data = await response.json();
  return data;
};

/**
 * Validar token com endpoint /me
 */
export const validateToken = async (token: string): Promise<User | null> => {
  if (!API_URL || !token) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const userData = await response.json();
    return userData;
  } catch {
    return null;
  }
};

/**
 * Salvar token no cookie
 */
export const saveAuthToken = (token: string): void => {
  const cookieOptions = {
    expires: 1, // 1 dia
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };

  Cookies.set("authToken", token, cookieOptions);
};

/**
 * Obter token do cookie
 */
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return Cookies.get("authToken") || null;
};

/**
 * Remover token do cookie
 */
export const removeAuthToken = (): void => {
  Cookies.remove("authToken", {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

/**
 * Verificar se usuário está autenticado
 */
export const isUserAuthenticated = (): boolean => {
  const token = getAuthToken();
  return !!token;
};

/**
 * Fazer logout completo
 */
export const logoutUser = (): void => {
  removeAuthToken();

  // Redirecionar para home
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
};
