"use client";

import { useState, useCallback, useEffect } from "react";
import { Pedido } from "@/types/pedidos";
import { getMeusPedidos } from "../services/pedidosService";
import { toaster } from "@/components/ui/toaster";

export type UseMeusPedidosReturn = ReturnType<typeof useMeusPedidos>;

/**
 * Hook com a Responsabilidade Única de gerenciar os pedidos do usuário logado.
 * Diferente do usePedidos que busca todos os pedidos (para funcionários/admins).
 */
export const useMeusPedidos = (enabled: boolean = true) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const fetchMeusPedidos = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getMeusPedidos();
      setPedidos(data);
      setError(null);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Erro ao carregar seus pedidos.";
      setError(msg);
      toaster.create({ title: "Erro", description: msg, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      fetchMeusPedidos();
    } else {
      setIsLoading(false);
    }
  }, [fetchMeusPedidos, enabled]);

  return {
    pedidos,
    isLoading,
    error,
    refetch: fetchMeusPedidos,
  };
};
