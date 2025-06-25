import { useState, useEffect } from "react";
import { Pizza } from "../types";
import { getPizzas } from "../services/pizza-service";

interface UsePizzasReturn {
  pizzas: Pizza[];
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
      const data = await getPizzas();
      setPizzas(data);
    } catch (err) {
      console.error("Error fetching pizzas:", err);
      setError("Erro ao carregar pizzas. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return {
    pizzas,
    isLoading,
    error,
    refetch: fetchPizzas,
  };
};
