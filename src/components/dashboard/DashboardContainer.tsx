"use client";

import { Box } from "@chakra-ui/react";
import { DashboardContent } from "./DashboardContent";
import { GerenciarCardapio } from "@/features/pizzas/components/GerenciarCardapio";

// Importando os tipos dos nossos hooks para tipar as props
import { UseDashboardReturn } from "@/hooks/useDashboard";
import { UsePizzasReturn } from "@/features/pizzas/hooks/usePizzas";

// O Container agora espera receber os hooks como props
interface DashboardContainerProps {
  dashboardHook: UseDashboardReturn;
  pizzaHook: UsePizzasReturn;
}

export const DashboardContainer = ({
  dashboardHook,
  pizzaHook,
}: DashboardContainerProps) => {
  return (
    <Box>
      {dashboardHook.isGerenciarView ? (
        // Se a visão de "Gerenciar" estiver ativa, renderiza o componente de gerenciamento
        <GerenciarCardapio
          onNavigateBack={dashboardHook.handleHideGerenciarCardapio}
          pizzaHook={pizzaHook} // Passa a lógica de pizza para o componente de gerenciamento
        />
      ) : (
        // Caso contrário, mostra o conteúdo principal do dashboard
        <DashboardContent {...dashboardHook} />
      )}
    </Box>
  );
};
