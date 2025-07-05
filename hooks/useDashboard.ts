import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "../constants";
// import { getAuthToken } from "../services/auth-service"; // Será usado quando endpoint real estiver disponível
import type { Pizza } from "../types";

interface DashboardStats {
  totalPizzas: number;
  pedidosHoje: number;
  receitaTotal: number;
  pizzasMaisVendidas: string;
}

interface UseDashboardReturn {
  stats: DashboardStats;
  showCreateForm: boolean;
  isLoading: boolean;
  error: string | null;
  handleNavigateToCardapio: () => void;
  handleNavigateToPedidos: () => void;
  handleShowCreateForm: () => void;
  handleHideCreateForm: () => void;
  handlePizzaCreated: (pizza: Pizza) => void;
  refetch: () => Promise<void>;
}

export const useDashboard = (): UseDashboardReturn => {
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalPizzas: 0,
    pedidosHoje: 0,
    receitaTotal: 0,
    pizzasMaisVendidas: "Carregando...",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if (!API_URL) {
        throw new Error("URL da API não configurada");
      }

      // const token = getAuthToken(); // Será usado quando endpoint real estiver disponível

      // Mock temporário para estatísticas do dashboard
      // TODO: Substituir por endpoint real quando estiver disponível
      const mockStats = {
        totalPizzas: 12,
        pedidosHoje: 8,
        receitaTotal: 450.5,
        pizzasMaisVendidas: "Margherita",
      };

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 800));

      setStats(mockStats);

      // Código original comentado para quando o endpoint estiver disponível:
      /*
      // Buscar dados de pizzas e pedidos para calcular estatísticas
      const [pizzasResponse, pedidosResponse] = await Promise.allSettled([
        fetch(`${API_URL}/pizzas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }),
        fetch(`${API_URL}/pedidos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }),
      ]);

      let totalPizzas = 0;
      let pedidosHoje = 0;
      let receitaTotal = 0;
      let pizzasMaisVendidas = "Margherita";

      // Processar dados das pizzas
      if (pizzasResponse.status === "fulfilled" && pizzasResponse.value.ok) {
        const pizzasData = await pizzasResponse.value.json();
        totalPizzas = pizzasData.length || 0;
      }

      // Processar dados dos pedidos
      if (pedidosResponse.status === "fulfilled" && pedidosResponse.value.ok) {
        const pedidosData = await pedidosResponse.value.json();
        
        // Filtrar pedidos de hoje
        const hoje = new Date().toISOString().split('T')[0];
        const pedidosDeHoje = pedidosData.filter((pedido: any) => {
          const dataPedido = new Date(pedido.createdAt || pedido.data).toISOString().split('T')[0];
          return dataPedido === hoje;
        });

        pedidosHoje = pedidosDeHoje.length;
        receitaTotal = pedidosDeHoje.reduce((total: number, pedido: any) => {
          return total + (pedido.total || pedido.valor || 0);
        }, 0);
      }

      setStats({
        totalPizzas,
        pedidosHoje,
        receitaTotal,
        pizzasMaisVendidas,
      });
      */
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar estatísticas"
      );

      // Fallback para dados padrão em caso de erro
      setStats({
        totalPizzas: 0,
        pedidosHoje: 0,
        receitaTotal: 0,
        pizzasMaisVendidas: "Não disponível",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
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

  const handlePizzaCreated = useCallback(() => {
    setShowCreateForm(false);
    // Refetch stats após criar uma pizza
    fetchDashboardStats();
  }, []);

  return {
    stats,
    showCreateForm,
    isLoading,
    error,
    handleNavigateToCardapio,
    handleNavigateToPedidos,
    handleShowCreateForm,
    handleHideCreateForm,
    handlePizzaCreated,
    refetch: fetchDashboardStats,
  };
};
