"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useDashboard } from "@/hooks/useDashboard";
import { usePizzas } from "@/features/pizzas/hooks/usePizzas";

// O DashboardContainer se torna o componente principal da página
import { DashboardContainer } from "@/components/dashboard/DashboardContainer";

export default function DashboardPage() {
  // O estado da UI agora vive aqui, na página que o controla.
  const [isGerenciarView, setIsGerenciarView] = useState(false);

  // Cada hook com sua responsabilidade única
  const dashboardHook = useDashboard();
  const pizzaHook = usePizzas();

  return (
    <Box w="full" minH="100vh" bg="gray.100" p={8}>
      <DashboardContainer
        // Passando o estado da UI e suas funções de controle
        isGerenciarView={isGerenciarView}
        onShowGerenciarCardapio={() => setIsGerenciarView(true)}
        onHideGerenciarCardapio={() => setIsGerenciarView(false)}
        // Passando os hooks para o container distribuir
        dashboardHook={dashboardHook}
        pizzaHook={pizzaHook}
      />
    </Box>
  );
}
