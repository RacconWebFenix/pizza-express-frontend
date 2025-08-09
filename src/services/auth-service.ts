// Definindo a tipagem do usuário para corresponder ao backend
interface User {
  id: number;
  nome: string;
  email: string;
  avatar?: string | null;
  role: string;
}

const getBackendUrl = (): string => {
  const url =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:10000";
  console.log("[AUTH-SERVICE] Backend URL:", url);
  console.log(
    "[AUTH-SERVICE] NEXT_PUBLIC_API_URL:",
    process.env.NEXT_PUBLIC_API_URL
  );
  console.log(
    "[AUTH-SERVICE] NEXT_PUBLIC_BACKEND_URL:",
    process.env.NEXT_PUBLIC_BACKEND_URL
  );
  return url;
};

// Interface para dados de login
interface LoginCredentials {
  email: string;
  password: string;
}

// Interface para resposta de login
interface LoginResponse {
  access_token: string;
  user: User;
}

// Função para fazer login com email/senha
export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await fetch(`${getBackendUrl()}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || "Credenciais inválidas. Verifique email e senha."
    );
  }

  const data: LoginResponse = await response.json();
  return data;
};

// Função para buscar os dados do usuário, agora com a tipagem correta
export const getMe = async (token: string): Promise<User> => {
  const url = `${getBackendUrl()}/me`;
  console.log("[AUTH-SERVICE] Fazendo request para:", url);
  console.log("[AUTH-SERVICE] Token:", token.substring(0, 20) + "...");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("[AUTH-SERVICE] Response status:", response.status);
  console.log("[AUTH-SERVICE] Response ok:", response.ok);

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Erro desconhecido");
    console.error("[AUTH-SERVICE] Error response:", errorText);
    throw new Error(
      "Falha ao buscar dados do usuário. O token pode ser inválido."
    );
  }

  const data: User = await response.json();
  console.log("[AUTH-SERVICE] User data:", data);
  return data;
};

// Função para obter o token salvo
export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

// Objeto que exporta a URL de login do Google
export const authService = {
  getGoogleSignInUrl: (): string => {
    return `${getBackendUrl()}/auth/google`;
  },
};
