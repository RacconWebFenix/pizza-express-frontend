import { useCallback } from "react";
import { usePizzas } from "./usePizzas";
import { Pizza } from "../types";

interface UseCardapioReturn {
  pizzas: Pizza[];
  isLoading: boolean;
  error: string | null;
  handlePedir: (pizzaId: string, pizzaNome: string) => void;
  handleVerPedidos: () => void;
  refetch: () => Promise<void>;
}

export const useCardapio = (): UseCardapioReturn => {
  const { pizzas, isLoading, error, refetch } = usePizzas();

  const handlePedir = useCallback((_pizzaId: string, _pizzaNome: string) => {
    // TODO: Implementar lógica de pedido
    // Aqui seria chamado um serviço para adicionar ao carrinho ou fazer pedido
  }, []);

  const handleVerPedidos = useCallback(() => {
    // TODO: Implementar navegação para pedidos
    // Router.push('/pedidos') ou similar
  }, []);

  return {
    pizzas,
    isLoading,
    error,
    handlePedir,
    handleVerPedidos,
    refetch,
  };
};
