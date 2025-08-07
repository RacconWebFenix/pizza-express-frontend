"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { getMe, authService } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "@/utils/cookies";

// Definindo a tipagem do usuário para corresponder ao backend
interface User {
  id: number;
  nome: string;
  email: string;
  avatar?: string | null;
  role: string;
}

// Definindo a tipagem para as propriedades do contexto
interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => void;
  handleAuthentication: (token: string) => Promise<void>;
  login: (token: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Esta função é chamada para validar um token e buscar os dados do usuário
  const handleAuthentication = useCallback(
    async (token: string, redirect: boolean = true) => {
      setIsLoading(true);
      try {
        console.log("[AUTH] Salvando token:", token.substring(0, 20) + "...");

        // 1. Guarda o token no localStorage E nos cookies
        localStorage.setItem("authToken", token);
        setCookie("authToken", token, 7); // Expira em 7 dias

        // 2. Busca os dados do usuário no backend usando o token
        const userData = await getMe(token);
        setUser(userData);

        console.log("[AUTH] Usuário autenticado:", userData.email);

        // 3. Se for um login novo, redireciona para o dashboard
        if (redirect) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Falha na autenticação:", error);
        // Limpa o estado e o storage em caso de erro (token inválido)
        localStorage.removeItem("authToken");
        deleteCookie("authToken");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // Função simplificada de login para compatibilidade com useLogin
  const login = useCallback(
    async (token: string): Promise<boolean> => {
      try {
        await handleAuthentication(token, false);
        return true;
      } catch (error) {
        console.error("Erro no login:", error);
        return false;
      }
    },
    [handleAuthentication]
  );

  // Efeito que roda uma vez quando a aplicação carrega
  useEffect(() => {
    const initAuth = async () => {
      // Tenta primeiro do localStorage, depois dos cookies
      let token = localStorage.getItem("authToken");
      if (!token) {
        token = getCookie("authToken");
        if (token) {
          // Se encontrou nos cookies, sincroniza com localStorage
          localStorage.setItem("authToken", token);
        }
      }

      if (token) {
        console.log("[AUTH] Token encontrado, validando sessão...");
        // Se um token existe, tenta validar a sessão sem redirecionar
        await handleAuthentication(token, false);
      } else {
        console.log("[AUTH] Nenhum token encontrado");
        // Se não há token, encerra o loading
        setIsLoading(false);
      }
    };

    initAuth();
  }, [handleAuthentication]); // Agora handleAuthentication é uma dependência estável

  // Função para iniciar o login com o Google
  const signInWithGoogle = () => {
    // Redireciona para a URL de autenticação do backend
    window.location.href = authService.getGoogleSignInUrl();
  };

  // Função para fazer logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    deleteCookie("authToken");
    router.push("/"); // Redireciona para a home após o logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signInWithGoogle,
        handleAuthentication,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto nas páginas
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
