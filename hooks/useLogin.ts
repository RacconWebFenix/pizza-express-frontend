import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/auth/auth-context";

interface UseLoginReturn {
  email: string;
  password: string;
  loading: boolean;
  error: string;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      if (error) setError(""); // Limpa erro ao digitar
    },
    [error]
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      setPassword(value);
      if (error) setError(""); // Limpa erro ao digitar
    },
    [error]
  );

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      console.log("Iniciando login com:", {
        email,
        api: process.env.NEXT_PUBLIC_API_URL,
      });

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        console.log("Resposta da API:", {
          status: response.status,
          ok: response.ok,
        });

        const responseData = await response.json();
        console.log("Dados da resposta:", responseData);

        if (response.ok && responseData.access_token) {
          console.log("Token recebido, tentando fazer login...");
          const loginSuccess = await login(responseData.access_token);

          if (loginSuccess) {
            console.log("Login bem-sucedido, redirecionando...");
            if (typeof window !== "undefined") {
              window.location.href = "/cardapio";
            } else {
              router.push("/cardapio");
            }
          } else {
            console.error("Falha na validação do token");
            setError(
              "Erro na validação do usuário. Por favor, tente novamente."
            );
          }
        } else {
          console.error("Erro na resposta da API:", responseData);
          setError(
            responseData.message || "Email ou senha inválidos. Tente novamente."
          );
        }
      } catch (error) {
        console.error("Erro no login:", error);

        // Fallback para desenvolvimento - permite login com credenciais demo
        if (email === "admin@pizza.com" && password === "123456") {
          console.log("Usando fallback de desenvolvimento");

          // Cria um token demo
          const demoToken = "demo-token-" + Date.now();

          // Tenta fazer login com dados mock
          try {
            const mockUser = { userId: 1, email: "admin@pizza.com" };

            // Simula armazenamento local
            if (typeof window !== "undefined") {
              localStorage.setItem("demoUser", JSON.stringify(mockUser));
              localStorage.setItem("demoToken", demoToken);
              window.location.href = "/cardapio";
            }
            return;
          } catch (mockError) {
            console.error("Erro no fallback:", mockError);
          }
        }

        setError("Erro de conexão. Para testar, use: admin@pizza.com / 123456");
      } finally {
        setLoading(false);
      }
    },
    [email, password, login, router]
  );

  return {
    email,
    password,
    loading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    clearError,
  };
};
