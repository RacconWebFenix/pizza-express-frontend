"use client";

import { Box } from "@chakra-ui/react";
import { DashboardContent } from "./DashboardContent";
import { GerenciarCardapio } from "@/features/pizzas/components/GerenciarCardapio";
import { PizzaFormContainer } from "@/features/pizzas/components/PizzaFormContainer";

// Importando os tipos dos hooks para tipar as props
import { UseDashboardReturn } from "@/hooks/useDashboard";
import { UsePizzasReturn } from "@/features/pizzas/hooks/usePizzas";

// A interface de props agora é explícita
interface DashboardContainerProps {
  isGerenciarView: boolean;
  onShowGerenciarCardapio: () => void;
  onHideGerenciarCardapio: () => void;
  dashboardHook: UseDashboardReturn;
  pizzaHook: UsePizzasReturn;
}

export const DashboardContainer = ({
  isGerenciarView,
  onShowGerenciarCardapio,
  onHideGerenciarCardapio,
  dashboardHook,
  pizzaHook,
}: DashboardContainerProps) => {
  return (
    <Box>
      {isGerenciarView ? (
        <GerenciarCardapio
          onNavigateBack={onHideGerenciarCardapio}
          pizzaHook={pizzaHook}
        />
      ) : (
        <DashboardContent
          onShowGerenciarCardapio={onShowGerenciarCardapio}
          // Passando apenas o que o DashboardContent precisa do hook de dashboard
          stats={dashboardHook.stats}
          handleNavigateToCardapio={dashboardHook.handleNavigateToCardapio}
          handleNavigateToPedidos={dashboardHook.handleNavigateToPedidos}
        />
      )}

      {/* O Modal continua sendo orquestrado aqui, controlado pela lógica do pizzaHook */}
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
};
