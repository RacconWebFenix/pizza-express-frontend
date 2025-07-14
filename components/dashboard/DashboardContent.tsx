"use client";

import { Box, VStack } from "@chakra-ui/react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { DashboardActions } from "./DashboardActions";
import { GerenciarCardapio } from "./GerenciarCardapio";
import { PizzaFormContainer } from "./PizzaFormContainer";

import { UseDashboardReturn } from "../../hooks/useDashboard"; // Importe a interface do hook
import { DASHBOARD_CONSTANTS } from "../../constants/dashboard";

/**
 * Componente de Apresentação que gerencia o layout do conteúdo do dashboard
 * e renderiza os modais de forma desacoplada.
 */
export function DashboardContent({
  stats,
  isGerenciarView, // Nome atualizado
  handleNavigateToPedidos,
  handleShowGerenciarCardapio,
  handleHideGerenciarCardapio,
  handleNavigateToCardapio,
  isFormModalOpen,
  pizzaToEdit,

  handleCloseFormModal,
  handlePizzaSaved,
}: UseDashboardReturn) {
  // A interface de props agora é a mesma do retorno do hook
  const { LAYOUT } = DASHBOARD_CONSTANTS;

  return (
    // Usamos um React Fragment <> para agrupar o layout principal e os modais
    <>
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
          {isGerenciarView ? (
            // A view de Gerenciar agora recebe a função para abrir o formulário
            <GerenciarCardapio
              onNavigateBack={handleHideGerenciarCardapio}
              // onOpenForm={handleOpenFormModal}
            />
          ) : (
            // O Dashboard principal
            <>
              <DashboardHeader />
              <DashboardStats stats={stats} />
              <DashboardActions
                onNavigateToPedidos={handleNavigateToPedidos}
                onShowCreateForm={handleShowGerenciarCardapio}
                onNavigateToCardapio={handleNavigateToCardapio}
              />
            </>
          )}
        </VStack>
      </Box>

      <PizzaFormContainer
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        pizzaToEdit={pizzaToEdit}
        onSuccess={handlePizzaSaved}
      />
    </>
  );
}
