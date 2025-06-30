import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "../constants";
import { mockDashboardStats } from "../mock";
import type { Pizza } from "../types";

interface UseDashboardReturn {
  stats: {
    totalPizzas: number;
    pedidosHoje: number;
    receitaTotal: number;
    pizzasMaisVendidas: string;
  };
  showCreateForm: boolean;
  handleNavigateToCardapio: () => void;
  handleNavigateToPedidos: () => void;
  handleShowCreateForm: () => void;
  handleHideCreateForm: () => void;
  handlePizzaCreated: (pizza: Pizza) => void;
}

export const useDashboard = (): UseDashboardReturn => {
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Converte os dados do mock para o formato esperado
  const stats = useMemo(() => {
    const statsData = mockDashboardStats;
    return {
      totalPizzas: parseInt(statsData[0]?.value?.toString() || "0"),
      pedidosHoje: parseInt(statsData[1]?.value?.toString() || "0"),
      receitaTotal: parseFloat(
        statsData[2]?.value?.toString().replace(/[^\d.-]/g, "") || "0"
      ),
      pizzasMaisVendidas: "Margherita", // Valor padrão
    };
  }, []);

  const handleNavigateToCardapio = useCallback(() => {
    router.push(ROUTES.APP.CARDAPIO);
  }, [router]);

  const handleNavigateToPedidos = useCallback(() => {
    router.push(ROUTES.APP.PEDIDOS);
  }, [router]);

  const handleShowCreateForm = useCallback(() => {
    setShowCreateForm(true);
  }, []);

  const handleHideCreateForm = useCallback(() => {
    setShowCreateForm(false);
  }, []);

  const handlePizzaCreated = useCallback((pizza: Pizza) => {
    console.log("Pizza criada com sucesso:", pizza);
    setShowCreateForm(false);
    // TODO: Implementar atualização da lista de pizzas, notificações, etc.
  }, []);

  return {
    stats,
    showCreateForm,
    handleNavigateToCardapio,
    handleNavigateToPedidos,
    handleShowCreateForm,
    handleHideCreateForm,
    handlePizzaCreated,
  };
};
