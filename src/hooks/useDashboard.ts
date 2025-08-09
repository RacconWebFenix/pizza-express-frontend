"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPedidos } from "@/features/pedidos/services/pedidosService";
import { formatCurrency } from "@/utils/format";
import { ROUTES } from "@/constants";
import { Pedido } from "@/types/pedidos";
import { toaster } from "@/components/ui/toaster";

// Interfaces para as estatísticas
interface FormattedDashboardStats {
  faturamentoTotal: string;
  pedidosHoje: string;
  totalDePedidos: string;
  ticketMedio: string;
}

export type UseDashboardReturn = ReturnType<typeof useDashboard>;

/**
 * Hook com a Responsabilidade Única de gerenciar as ESTATÍSTICAS e NAVEGAÇÃO
 * da página de Dashboard.
 */
export const useDashboard = () => {
  const router = useRouter();

  const [stats, setStats] = useState<FormattedDashboardStats>({
    faturamentoTotal: formatCurrency(0),
    pedidosHoje: "0",
    totalDePedidos: "0",
    ticketMedio: formatCurrency(0),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAndCalculateStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const todosOsPedidos: Pedido[] = await getPedidos();

      const hoje = new Date().toISOString().split("T")[0];
      const pedidosDeHoje = todosOsPedidos.filter(
        (p) => p.criadoEm.split("T")[0] === hoje
      );

      const faturamentoTotal = todosOsPedidos.reduce((total, pedido) => {
        const valorDoPedido = pedido.pizzas.reduce(
          (soma, pizza) => soma + pizza.preco,
          0
        );
        return total + valorDoPedido;
      }, 0);

      const totalDePedidos = todosOsPedidos.length;
      const ticketMedio =
        totalDePedidos > 0 ? faturamentoTotal / totalDePedidos : 0;

      setStats({
        faturamentoTotal: formatCurrency(faturamentoTotal),
        pedidosHoje: pedidosDeHoje.length.toString(),
        totalDePedidos: totalDePedidos.toString(),
        ticketMedio: formatCurrency(ticketMedio),
      });

      setError(null);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Falha ao carregar estatísticas.";
      setError(msg);
      toaster.create({ title: "Erro", description: msg, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndCalculateStats();
  }, [fetchAndCalculateStats]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchAndCalculateStats,
    handleNavigateToCardapio: () => router.push(ROUTES.APP.CARDAPIO),
    handleNavigateToPedidos: () => router.push(ROUTES.APP.PEDIDOS),
  };
};
