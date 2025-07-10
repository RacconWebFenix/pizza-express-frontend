"use client";

import { Box, VStack } from "@chakra-ui/react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { DashboardActions } from "./DashboardActions";
import { GerenciarCardapio } from "./GerenciarCardapio"; // Importe o novo componente
import { DASHBOARD_CONSTANTS } from "../../constants/dashboard";

// A interface de props agora reflete a nova lógica de visualização
interface DashboardContentProps {
  stats: {
    totalPizzas: number;
    pedidosHoje: number;
    receitaTotal: number;
    pizzasMaisVendidas: string;
  };
  showGerenciarCardapio: boolean;
  onNavigateToPedidos: () => void;
  onShowGerenciarCardapio: () => void; // Ação para mostrar a tela de gerenciamento
  onHideGerenciarCardapio: () => void; // Ação para voltar ao dashboard
}

export function DashboardContent({
  stats,
  showGerenciarCardapio,
  onNavigateToPedidos,
  onShowGerenciarCardapio,
  onHideGerenciarCardapio,
}: DashboardContentProps) {
  const { LAYOUT } = DASHBOARD_CONSTANTS;

  // Se showGerenciarCardapio for true, renderiza a tela de gerenciamento
  if (showGerenciarCardapio) {
    return (
      <Box
        bg={LAYOUT.BACKGROUND_COLOR}
        minH={LAYOUT.MIN_HEIGHT}
        p={LAYOUT.PADDING}
      >
        <GerenciarCardapio onNavigateBack={onHideGerenciarCardapio} />
      </Box>
    );
  }

  // Caso contrário, mostra o dashboard principal com as estatísticas
  return (
    <Box
      bg={LAYOUT.BACKGROUND_COLOR}
      minH={LAYOUT.MIN_HEIGHT}
      p={LAYOUT.PADDING}
    >
      <VStack
        gap={LAYOUT.GAP}
        align="stretch"
        w="full"
        maxW={LAYOUT.MAX_WIDTH}
        mx="auto"
      >
        <DashboardHeader />
        <DashboardStats stats={stats} />
        <DashboardActions
          // O botão "Ver Cardápio" agora vai chamar onShowGerenciarCardapio
          onNavigateToCardapio={onShowGerenciarCardapio}
          onNavigateToPedidos={onNavigateToPedidos}
          // A ação de criar pizza também deve levar para a tela de gerenciamento
          onShowCreateForm={onShowGerenciarCardapio}
        />
      </VStack>
    </Box>
  );
}
