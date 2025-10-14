"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { setCookie, getAuthToken, deleteCookie } from "@/utils/cookies";
import { User } from "@/types/users";
import { getMe, loginUser, getGoogleSignInUrl } from "../services/authService";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => void;
  handleAuthentication: (token: string, redirect?: boolean) => Promise<boolean>;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleAuthentication = useCallback(
    async (token: string, redirect: boolean = true): Promise<boolean> => {
      setIsLoading(true);
      try {
        // No nosso utilitário, setCookie agora é mais simples
        setCookie(token);
        const userData = await getMe(token);
        setUser(userData);
        if (redirect) {
          // Redireciona baseado no role do usuário
          const redirectPath = userData.role === "CLIENTE" ? "/cardapio" : "/dashboard";
          router.push(redirectPath);
        }
        return true;
      } catch (error) {
        console.error("Falha na autenticação:", error);
        setUser(null);
        deleteCookie();
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      // 1. Chama o serviço de API para obter o token
      const { access_token } = await loginUser(credentials);
      // 2. Usa o token para autenticar e buscar os dados do usuário
      return await handleAuthentication(access_token, true);
    } catch (error) {
      console.error("Falha no login:", error);
      setIsLoading(false);
      // Propaga o erro para que a página de login possa exibi-lo
      throw error;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (token) {
        await handleAuthentication(token, false);
      } else {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [handleAuthentication]);

  const signInWithGoogle = () => {
    window.location.href = getGoogleSignInUrl();
  };

  const logout = () => {
    setUser(null);
    deleteCookie();
    router.push("/");
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

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
