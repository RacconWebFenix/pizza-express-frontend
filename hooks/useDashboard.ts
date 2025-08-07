"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

// Tipos e serviços que sabemos que existem

// Utilitários e constantes do seu projeto
import { formatCurrency } from "@/utils/format";
import { ROUTES } from "@/constants";
import { Pizza } from "@/types";
import { getPedidos } from "@/services/pedido-service";
import { toaster } from "@/components/ui/toaster";

// Interfaces para as estatísticas
interface FormattedDashboardStats {
  faturamentoDia: string;
  pedidosHoje: string;
  ticketMedio: string;
}

/**
 * Hook para gerenciar o estado e a lógica da página de Dashboard.
 * Versão corrigida para buscar dados reais e calcular estatísticas.
 */
export const useDashboard = () => {
  const router = useRouter();

  // --- SEUS ESTADOS DE UI (INTOCADOS) ---
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGerenciarView, setIsGerenciarView] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [pizzaToEdit, setPizzaToEdit] = useState<Pizza | null>(null);
  const [stats, setStats] = useState<FormattedDashboardStats>({
    faturamentoDia: formatCurrency(0),
    pedidosHoje: "0",
    ticketMedio: formatCurrency(0),
  });

  // --- PASSO 1 e 2: NOVA FUNÇÃO PARA BUSCAR DADOS E CALCULAR STATS ---
  const fetchAndCalculateStats = useCallback(async () => {
    try {
      setIsLoading(true);
      // Busca a fonte de dados correta
      const todosOsPedidos = await getPedidos();

      // Calcula as estatísticas
      const hoje = new Date().toISOString().split("T")[0];
      const pedidosDeHoje = todosOsPedidos.filter(
        (p) => p.criadoEm.split("T")[0] === hoje
      );

      const faturamentoDoDia = pedidosDeHoje.reduce((total, pedido) => {
        const valorDoPedido = pedido.pizzas.reduce(
          (soma, pizza) => soma + pizza.preco,
          0
        );
        return total + valorDoPedido;
      }, 0);

      const numeroDePedidosHoje = pedidosDeHoje.length;
      const ticketMedio =
        numeroDePedidosHoje > 0 ? faturamentoDoDia / numeroDePedidosHoje : 0;

      // Atualiza o estado com os dados calculados
      setStats({
        faturamentoDia: formatCurrency(faturamentoDoDia),
        pedidosHoje: numeroDePedidosHoje.toString(),
        ticketMedio: formatCurrency(ticketMedio),
      });

      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Falha ao carregar dados do dashboard.";
      setError(errorMessage);
      // Usando o toaster com a sintaxe correta que você especificou
      toaster.create({
        title: "Erro ao carregar dados",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- PASSO 3: INTEGRAÇÃO ---
  useEffect(() => {
    fetchAndCalculateStats();
  }, [fetchAndCalculateStats]);

  // --- SUAS FUNÇÕES DE CONTROLE (INTOCADAS) ---
  const handleNavigateToCardapio = () => router.push(ROUTES.APP.CARDAPIO);
  const handleNavigateToPedidos = () => router.push(ROUTES.APP.PEDIDOS);
  const handleShowGerenciarCardapio = () => setIsGerenciarView(true);
  const handleHideGerenciarCardapio = () => setIsGerenciarView(false);

  const handleOpenFormModal = (pizza: Pizza | null = null) => {
    setPizzaToEdit(pizza);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setPizzaToEdit(null);
  };

  // Quando uma pizza é salva, re-calculamos os stats (pode ser útil no futuro)
  const handlePizzaSaved = () => {
    fetchAndCalculateStats();
    handleCloseFormModal();
  };

  return {
    stats,
    isLoading,
    error,
    isGerenciarView,
    isFormModalOpen,
    pizzaToEdit,
    handleNavigateToCardapio,
    handleNavigateToPedidos,
    handleShowGerenciarCardapio,
    handleHideGerenciarCardapio,
    handleOpenFormModal,
    handleCloseFormModal,
    handlePizzaSaved,
    // A função refetch agora chama a lógica correta
    refetch: fetchAndCalculateStats,
  };
};

export type UseDashboardReturn = ReturnType<typeof useDashboard>;
