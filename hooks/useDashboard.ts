import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "../constants";


interface DashboardStats {
  totalPizzas: number;
  pedidosHoje: number;
  receitaTotal: number;
  pizzasMaisVendidas: string;
}

// CORREÇÃO: Sincronizando a interface com a implementação
interface UseDashboardReturn {
  stats: DashboardStats;
  isGerenciarView: boolean; // Renomeado de showCreateForm
  isLoading: boolean;
  error: string | null;
  handleNavigateToCardapio: () => void;
  handleNavigateToPedidos: () => void;
  handleShowGerenciarCardapio: () => void; // Renomeado de handleShowCreateForm
  handleHideGerenciarCardapio: () => void; // Renomeado de handleHideCreateForm
  handlePizzaCreated: () => void; // Removido o parâmetro 'pizza' que não era usado
  refetch: () => Promise<void>;
}

export const useDashboard = (): UseDashboardReturn => {
  const router = useRouter();
  const [isGerenciarView, setIsGerenciarView] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalPizzas: 0,
    pedidosHoje: 0,
    receitaTotal: 0,
    pizzasMaisVendidas: "Carregando...",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Usando useCallback para que a função não seja recriada a cada renderização
  const fetchDashboardStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock temporário para estatísticas do dashboard
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
  }, []); // Array de dependências vazio, a função é estável

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const handleNavigateToCardapio = useCallback(() => {
    router.push(ROUTES.APP.CARDAPIO);
  }, [router]);

  const handleNavigateToPedidos = useCallback(() => {
    router.push(ROUTES.APP.PEDIDOS);
  }, [router]);

  // CORREÇÃO: Renomeando os handlers para clareza e consistência
  const handleShowGerenciarCardapio = useCallback(() => {
    setIsGerenciarView(true);
  }, []);

  const handleHideGerenciarCardapio = useCallback(() => {
    setIsGerenciarView(false);
  }, []);

  const handlePizzaCreated = useCallback(() => {
    setIsGerenciarView(false);
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // CORREÇÃO: Sincronizando o objeto de retorno com a interface
  return {
    stats,
    isGerenciarView,
    isLoading,
    error,
    handleNavigateToCardapio,
    handleNavigateToPedidos,
    handleShowGerenciarCardapio, // Nome consistente
    handleHideGerenciarCardapio, // Nome consistente
    handlePizzaCreated,
    refetch: fetchDashboardStats,
  };
};