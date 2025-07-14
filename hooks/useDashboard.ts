"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "../constants";
import { Pizza } from "../types"; // Importe o tipo Pizza

// Interface para as estatísticas
interface DashboardStats {
  totalPizzas: number;
  pedidosHoje: number;
  receitaTotal: number;
  pizzasMaisVendidas: string;
}

// Interface para o retorno completo do hook
export interface UseDashboardReturn {
  stats: DashboardStats;
  isGerenciarView: boolean;
  isLoading: boolean;
  error: string | null;
  handleNavigateToCardapio: () => void;
  handleNavigateToPedidos: () => void;
  handleShowGerenciarCardapio: () => void;
  handleHideGerenciarCardapio: () => void;
  refetch: () => Promise<void>;
  // --- Novas propriedades para os modais ---
  isFormModalOpen: boolean;
  pizzaToEdit: Pizza | null;

  handleOpenFormModal: (pizza?: Pizza) => void;
  handleCloseFormModal: () => void;
  handlePizzaSaved: () => void;
}

/**
 * Hook com a responsabilidade única (SRP) de gerenciar toda a lógica
 * de estado e ações da página de dashboard.
 */
export const useDashboard = (): UseDashboardReturn => {
  const router = useRouter();

  // --- Estados existentes ---
  const [isGerenciarView, setIsGerenciarView] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalPizzas: 0,
    pedidosHoje: 0,
    receitaTotal: 0,
    pizzasMaisVendidas: "Carregando...",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [pizzaToEdit, setPizzaToEdit] = useState<Pizza | null>(null);

  const fetchDashboardStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const mockStats = {
        totalPizzas: 12,
        pedidosHoje: 8,
        receitaTotal: 450.5,
        pizzasMaisVendidas: "Margherita",
      };
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStats(mockStats);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar estatísticas"
      );
      setStats({
        totalPizzas: 0,
        pedidosHoje: 0,
        receitaTotal: 0,
        pizzasMaisVendidas: "Não disponível",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // --- Handlers existentes ---
  const handleNavigateToCardapio = useCallback(
    () => router.push(ROUTES.APP.CARDAPIO),
    [router]
  );
  const handleNavigateToPedidos = useCallback(
    () => router.push(ROUTES.APP.PEDIDOS),
    [router]
  );
  const handleShowGerenciarCardapio = useCallback(
    () => setIsGerenciarView(true),
    []
  );
  const handleHideGerenciarCardapio = useCallback(
    () => setIsGerenciarView(false),
    []
  );

  const handleOpenFormModal = useCallback((pizza?: Pizza) => {
    setPizzaToEdit(pizza || null);
    setIsFormModalOpen(true);
  }, []);

  const handleCloseFormModal = useCallback(() => {
    setIsFormModalOpen(false);
    setPizzaToEdit(null);
  }, []);

  const handlePizzaSaved = useCallback(() => {
    handleCloseFormModal();

    router.refresh();
  }, [handleCloseFormModal, router]);

  return {
    stats,
    isGerenciarView,
    isLoading,
    error,
    handleNavigateToCardapio,
    handleNavigateToPedidos,
    handleShowGerenciarCardapio,
    handleHideGerenciarCardapio,
    refetch: fetchDashboardStats,

    isFormModalOpen,
    pizzaToEdit,

    handleOpenFormModal,
    handleCloseFormModal,
    handlePizzaSaved, // Nome novo e mais claro!
  };
};
