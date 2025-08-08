"use client";

import { VStack } from "@chakra-ui/react";
import { DashboardStats } from "./DashboardStats";
import { DashboardActions } from "./DashboardActions";

import { PedidosKanbanContainer } from "./PedidosKanbanContainer";

import { UseDashboardReturn } from "../../hooks/useDashboard";
import { DASHBOARD_CONSTANTS } from "../../constants/dashboard";
import { GerenciarCardapio, PizzaFormContainer } from ".";

export function DashboardContent({
  stats,
  isGerenciarView,
  handleNavigateToPedidos,
  handleShowGerenciarCardapio,
  handleHideGerenciarCardapio,
  handleNavigateToCardapio,
  isFormModalOpen,
  pizzaToEdit,
  handleCloseFormModal,
  handlePizzaSaved,
}: UseDashboardReturn) {
  const { LAYOUT } = DASHBOARD_CONSTANTS;

  return (
    <>
      <VStack
        gap={LAYOUT.GAP}
        align="stretch"
        w="full"
        maxW={LAYOUT.MAX_WIDTH}
        mx="auto"
      >
        {isGerenciarView ? (
          <GerenciarCardapio onNavigateBack={handleHideGerenciarCardapio} />
        ) : (
          <>
            <DashboardStats stats={stats} />

            <PedidosKanbanContainer />
            <DashboardActions
              onNavigateToPedidos={handleNavigateToPedidos}
              onShowCreateForm={handleShowGerenciarCardapio}
              onNavigateToCardapio={handleNavigateToCardapio}
            />
          </>
        )}
      </VStack>

      <PizzaFormContainer
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        pizzaToEdit={pizzaToEdit}
        onSuccess={handlePizzaSaved}
        isLoading={false}
        apiError={null}
      />
    </>
  );
}
