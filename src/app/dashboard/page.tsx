"use client";

import { useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { DollarSign, ListOrdered, BarChart, ShoppingCart } from "lucide-react";

import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { DashboardActions } from "@/features/dashboard/components/DashboardActions";

import { usePizzas } from "@/features/pizzas/hooks/usePizzas";
import { GerenciarCardapio } from "@/features/pizzas/components/GerenciarCardapio";
import { PizzaFormContainer } from "@/features/pizzas/components/PizzaFormContainer";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboard";

export default function DashboardPage() {
  const [isGerenciarView, setIsGerenciarView] = useState(false);

  const { stats, isLoading: isLoadingStats } = useDashboardStats();
  const pizzaHook = usePizzas();

  // Criamos o array de estatísticas com os ícones
  const formattedStats = [
    {
      label: "Faturamento Total",
      value: stats.faturamentoTotal,
      icon: DollarSign,
    },
    { label: "Pedidos Hoje", value: stats.pedidosHoje, icon: ShoppingCart },
    {
      label: "Total de Pedidos",
      value: stats.totalDePedidos,
      icon: ListOrdered,
    },
    { label: "Ticket Médio", value: stats.ticketMedio, icon: BarChart },
  ];

  return (
    <Box w="full" minH="100vh" bg="background.primary" p={{ base: 4, md: 8 }}>
      {isGerenciarView ? (
        <GerenciarCardapio
          onNavigateBack={() => setIsGerenciarView(false)}
          pizzaHook={pizzaHook}
        />
      ) : (
        <VStack gap={8} align="stretch">
          <DashboardStats stats={formattedStats} isLoading={isLoadingStats} />
          <DashboardActions
            onShowGerenciarCardapio={() => setIsGerenciarView(true)}
          />
        </VStack>
      )}

      <PizzaFormContainer
        isOpen={pizzaHook.isFormModalOpen}
        onClose={pizzaHook.handleCloseFormModal}
        pizzaToEdit={pizzaHook.pizzaToEdit}
        onSuccess={pizzaHook.handleSavePizza}
        isLoading={pizzaHook.isLoading}
        apiError={pizzaHook.error}
      />
    </Box>
  );
}
