"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  validateToken,
  getAuthToken,
  saveAuthToken,
  removeAuthToken,
  User,
} from "../../services/auth-service";

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
    return getAuthToken();
  });
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Valida o token existente no cookie quando o componente monta
  useEffect(() => {
    const initializeAuth = async () => {
      const existingToken = getAuthToken();

      if (existingToken) {
        const userData = await validateToken(existingToken);
        if (userData) {
          setUser(userData);
          setToken(existingToken);
        } else {
          // Token inválido, remove o cookie
          removeAuthToken();
          setToken(null);
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

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

    // Salva o token no cookie
    saveAuthToken(newToken);

    return true;
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    // Remove o token do cookie
    removeAuthToken();

    // Redireciona para a home
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
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
