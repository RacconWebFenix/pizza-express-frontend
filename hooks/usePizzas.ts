import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Pizza } from "../types";
import { getAuthToken } from "../services/auth-service";

interface UsePizzasReturn {
  pizzas: Pizza[];
  setPizzas: Dispatch<SetStateAction<Pizza[]>>; // Tipo para a função setPizzas
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePizzas = (): UsePizzasReturn => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPizzas = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if (!API_URL) {
        throw new Error("URL da API não configurada");
      }

      const token = getAuthToken();

      const response = await fetch(`${API_URL}/pizzas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Mapeia o campo 'image' do backend para 'imagemUrl' usado no frontend
      const pizzasAdaptadas = Array.isArray(data)
        ? data.map((pizza: Pizza) => ({
            ...pizza,
            imagemUrl:
              (pizza as Pizza & { image?: string }).image ||
              pizza.imagemUrl ||
              "",
          }))
        : [];
      setPizzas(pizzasAdaptadas);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao carregar pizzas. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []); // Sem dependências - executa apenas uma vez

  return {
    pizzas,
    setPizzas, // ADIÇÃO: Retorne a função aqui
    isLoading,
    error,
    refetch: fetchPizzas,
  };
};
