import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/auth/auth-context";
import { loginUser } from "../services/auth-service";

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

      try {
        const responseData = await loginUser({ email, password });

        if (responseData.access_token) {
          const loginSuccess = await login(responseData.access_token);

          if (loginSuccess) {
            router.push("/cardapio");
          } else {
            setError(
              "Erro na validação do usuário. Por favor, tente novamente."
            );
          }
        } else {
          setError("Resposta inválida do servidor. Tente novamente.");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erro de conexão. Verifique sua internet e tente novamente."
        );
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
