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

  const handlePedir = useCallback((pizzaId: string, pizzaNome: string) => {
    console.log(`Pedindo: ${pizzaNome} (ID: ${pizzaId})`);
    // TODO: Implementar lógica de pedido
    // Aqui seria chamado um serviço para adicionar ao carrinho ou fazer pedido
  }, []);

  const handleVerPedidos = useCallback(() => {
    console.log("Ver todos os pedidos");
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
