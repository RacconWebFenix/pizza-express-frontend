"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
// CORREÇÃO: Adicionando a importação que faltava para o useDashboard
import { useDashboard } from "@/hooks/useDashboard";
import { usePizzas } from "@/features/pizzas/hooks/usePizzas";



export default function DashboardPage() {
  const [isGerenciarView, setIsGerenciarView] = useState(false);

  // Cada hook com sua responsabilidade única
  const dashboardHook = useDashboard();
  const pizzaHook = usePizzas();

  return (
    <Box w="full" minH="100vh" bg="gray.100" p={8}>
      <DashboardContainer
        isGerenciarView={isGerenciarView}
        onShowGerenciarCardapio={() => setIsGerenciarView(true)}
        onHideGerenciarCardapio={() => setIsGerenciarView(false)}
        dashboardHook={dashboardHook}
        pizzaHook={pizzaHook}
      />
    </Box>
  );
}
