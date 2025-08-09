// src/features/auth/contexts/AuthContext.tsx
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
import { setCookie, getCookie, deleteCookie } from "@/utils/cookies";
import { User } from "@/types/users";
import { getMe } from "../services/authService";

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => void;
  // CORREÇÃO: A função agora retorna Promise<boolean>
  handleAuthentication: (token: string, redirect?: boolean) => Promise<boolean>;
  login: (token: string) => Promise<boolean>;
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
        setCookie("authToken", token, 1); // Define o cookie com validade de 1 dia
        const userData = await getMe(token);
        setUser(userData);
        if (redirect) {
          router.push("/dashboard");
        }
        return true; // Retorna sucesso
      } catch (error) {
        console.error("Falha na autenticação:", error);
        setUser(null);
        deleteCookie("authToken");
        return false; // Retorna falha
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    const initAuth = async () => {
      const token = getCookie("authToken");
      if (token) {
        await handleAuthentication(token, false);
      } else {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [handleAuthentication]);

  const signInWithGoogle = () => {
    // A URL do Google SignIn deve vir do authService
    // window.location.href = authService.getGoogleSignInUrl();
  };

  const logout = () => {
    setUser(null);
    deleteCookie("authToken");
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
        login: handleAuthentication, // A função login pode ser um alias direto
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
