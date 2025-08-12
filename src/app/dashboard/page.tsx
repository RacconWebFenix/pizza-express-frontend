"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";

// Importando os hooks de suas localizações corretas nas features
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { usePizzas } from "@/features/pizzas/hooks/usePizzas";

// Importando os componentes visuais que serão usados
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardActions } from "@/components/dashboard/DashboardActions";
import { GerenciarCardapio } from "@/features/pizzas/components/GerenciarCardapio";
import { PizzaFormContainer } from "@/features/pizzas/components/PizzaFormContainer";
import { PedidosKanbanContainer } from "@/components/dashboard/PedidosKanbanContainer";

export default function DashboardPage() {
  // O estado que controla qual "tela" é exibida (principal ou gerenciar cardápio)
  const [isGerenciarView, setIsGerenciarView] = useState(false);

  // Cada hook tem sua responsabilidade única
  const {
    stats,
    isLoading,
    handleNavigateToPedidos,
    handleNavigateToCardapio,
  } = useDashboard();
  const pizzaHook = usePizzas();

  return (
    <Box w="full" minH="100vh" bg="gray.100" p={8}>
      {isGerenciarView ? (
        // Se estiver na visão de "Gerenciar", renderiza o componente de gerenciamento de pizzas
        <GerenciarCardapio
          onNavigateBack={() => setIsGerenciarView(false)}
          pizzaHook={pizzaHook}
        />
      ) : (
        // Se estiver na visão principal, renderiza o conteúdo do dashboard
        <>
          <DashboardStats stats={stats} isLoading={isLoading} />
          <PedidosKanbanContainer />
          <DashboardActions
            onNavigateToPedidos={handleNavigateToPedidos}
            onShowCreateForm={() => setIsGerenciarView(true)} // A página controla a mudança de visão
            onNavigateToCardapio={handleNavigateToCardapio}
          />
        </>
      )}

      {/* O Modal para o formulário de pizza continua sendo controlado pela página */}
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
