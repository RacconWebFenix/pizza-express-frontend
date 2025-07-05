"use client";

import { Box, VStack } from "@chakra-ui/react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { DashboardActions } from "./DashboardActions";
import { CreatePizzaForm } from "./CreatePizzaForm";
import { DASHBOARD_CONSTANTS } from "../../constants/dashboard";
import type { Pizza } from "../../types";

interface DashboardContentProps {
  stats: {
    totalPizzas: number;
    pedidosHoje: number;
    receitaTotal: number;
    pizzasMaisVendidas: string;
  };
  showCreateForm: boolean;
  onNavigateToCardapio: () => void;
  onNavigateToPedidos: () => void;
  onShowCreateForm: () => void;
  onHideCreateForm: () => void;
  onPizzaCreated: (pizza: Pizza) => void;
}

export function DashboardContent({
  stats,
  showCreateForm,
  onNavigateToCardapio,
  onNavigateToPedidos,
  onShowCreateForm,
  onHideCreateForm,
  onPizzaCreated,
}: DashboardContentProps) {
  const { LAYOUT } = DASHBOARD_CONSTANTS;

  if (showCreateForm) {
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
          <CreatePizzaForm
            onSuccess={onPizzaCreated}
            onCancel={onHideCreateForm}
          />
        </VStack>
      </Box>
    );
  }

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
          onNavigateToCardapio={onNavigateToCardapio}
          onNavigateToPedidos={onNavigateToPedidos}
          onShowCreateForm={onShowCreateForm}
        />
      </VStack>
    </Box>
  );
}
