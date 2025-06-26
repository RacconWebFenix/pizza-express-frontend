"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";

interface User {
  userId: number;
  email: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    // Inicializa o token do cookie ao montar o componente
    if (typeof window !== "undefined") {
      return Cookies.get("authToken") || null;
    }
    return null;
  });
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Valida o token existente no cookie quando o componente monta
  useEffect(() => {
    const initializeAuth = async () => {
      const existingToken = Cookies.get("authToken");

      if (existingToken) {
        const userData = await validateToken(existingToken);
        if (userData) {
          setUser(userData);
          setToken(existingToken);
        } else {
          // Token inválido, remove o cookie
          Cookies.remove("authToken", { path: "/" });
          setToken(null);
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const validateToken = async (token: string): Promise<User | null> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

  const login = async (newToken: string): Promise<boolean> => {
    if (!newToken) {
      return false;
    }

    // Validar o token com a rota /me
    const userData = await validateToken(newToken);

    if (!userData) {
      return false;
    }

    // Se o token é válido, salva o usuário e o token
    setUser(userData);
    setToken(newToken);

    // Define o cookie com configurações específicas para produção
    const cookieOptions = {
      expires: 1, // 1 dia
      path: "/", // Disponível em todo o site
      sameSite: "lax" as const, // Menos restritivo que strict para produção
      secure: process.env.NODE_ENV === "production", // HTTPS apenas em produção
    };

    Cookies.set("authToken", newToken, cookieOptions);

    return true;
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    // Remove o cookie com as mesmas opções
    Cookies.remove("authToken", {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
