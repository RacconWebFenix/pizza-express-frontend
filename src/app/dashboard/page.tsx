"use client";

import { useState } from "react";
import { Box, VStack } from "@chakra-ui/react";

// Importando os hooks e componentes de suas novas casas

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

  return (
    <Box w="full" minH="100vh" bg="gray.100" p={8}>
      {isGerenciarView ? (
        <GerenciarCardapio
          onNavigateBack={() => setIsGerenciarView(false)}
          pizzaHook={pizzaHook}
        />
      ) : (
        <VStack gap={8} align="stretch">
          <DashboardStats stats={stats} isLoading={isLoadingStats} />
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
