"use client";

import { useState, useCallback, useEffect } from "react";
import { Pedido, StatusPedido } from "@/types/pedidos";

import { getPedidos, updatePedidoStatus } from "../services/pedidosService";
import { toaster } from "@/components/ui/toaster";

export type UsePedidosReturn = ReturnType<typeof usePedidos>;

/**
 * Hook com a Responsabilidade Única de gerenciar todo o estado e lógica de negócio
 * relacionados a Pedidos.
 */
export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPedidos = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getPedidos();
      setPedidos(data);
      setError(null);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Erro ao carregar pedidos.";
      setError(msg);
      toaster.create({ title: "Erro", description: msg, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  const handleUpdateStatus = async (pedidoId: number, status: StatusPedido) => {
    const originalPedidos = [...pedidos];
    // Atualização otimista da UI
    setPedidos((current) =>
      current.map((p) => (p.id === pedidoId ? { ...p, status } : p))
    );

    try {
      await updatePedidoStatus(pedidoId, status);
      toaster.create({
        title: "Sucesso!",
        description: `Status do pedido #${pedidoId} atualizado.`,
        type: "success",
      });
      fetchPedidos(); // Re-busca para garantir consistência
    } catch (err) {
      setPedidos(originalPedidos); // Reverte a UI em caso de erro
      const msg =
        err instanceof Error
          ? err.message
          : "Não foi possível atualizar o status.";
      toaster.create({ title: "Erro", description: msg, type: "error" });
    }
  };

  return {
    pedidos,
    isLoading,
    error,
    refetch: fetchPedidos,
    handleUpdateStatus,
  };
};
