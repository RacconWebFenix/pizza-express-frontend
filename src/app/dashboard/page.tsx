"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useDashboard } from "@/hooks/useDashboard";
import { usePizzas } from "@/features/pizzas/hooks/usePizzas";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { GerenciarCardapio } from "@/features/pizzas/components/GerenciarCardapio";
import { PizzaFormContainer } from "@/features/pizzas/components/PizzaFormContainer";

export default function DashboardPage() {
  // Estado local para controlar a visualização de gerenciamento de cardápio
  const [isGerenciarView, setIsGerenciarView] = useState(false);

  // Cada hook com sua responsabilidade única
  const dashboardHook = useDashboard();
  const pizzaHook = usePizzas();

  return (
    <Box w="full" minH="100vh" bg="gray.100" p={8}>
      {isGerenciarView ? (
        <GerenciarCardapio
          onNavigateBack={() => setIsGerenciarView(false)}
          pizzaHook={pizzaHook}
        />
      ) : (
        <DashboardContent
          {...dashboardHook}
          onShowGerenciarCardapio={() => setIsGerenciarView(true)}
        />
      )}

      {/* Modal para adicionar ou editar pizzas */}
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
