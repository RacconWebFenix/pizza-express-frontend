import { useState, useEffect, useCallback } from "react";
import { Pedido, StatusPedido } from "@/types/pedidos";
import { getPedidos, updatePedidoStatus } from "@/services/pedido-service";
import { toaster } from "@/components/ui/toaster";

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPedidos = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getPedidos(); // Função que já existia no seu projeto
      setPedidos(data);
      setError(null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Falha ao buscar os pedidos.";
      setError(errorMessage);
      toaster.create({
        title: "Erro na atualização",
        description: errorMessage,
        type: "error",
        duration: 3000,
        closable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  // Lógica para atualizar o status do pedido
  const handleUpdateStatus = async (pedidoId: number, status: StatusPedido) => {
    const originalPedidos = [...pedidos];
    // Atualização otimista
    setPedidos((currentPedidos) =>
      currentPedidos.map((p) => (p.id === pedidoId ? { ...p, status } : p))
    );

    try {
      await updatePedidoStatus(pedidoId, status);
      toaster.create({
        title: "Sucesso!",
        description: `Pedido #${pedidoId} foi atualizado.`,
        type: "success",
        duration: 3000,
        closable: true,
      });
    } catch (err) {
      // Reverte em caso de erro
      setPedidos(originalPedidos);
      const errorMessage =
        err instanceof Error ? err.message : "Falha ao atualizar o status.";
      toaster.create({
        title: "Erro na atualização",
        description: errorMessage,
        type: "error",
        duration: 3000,
        closable: true,
      });
    }
  };

  return {
    pedidos,
    isLoading,
    error,
    fetchPedidos,
    handleUpdateStatus, // Expondo a nova função
  };
};
