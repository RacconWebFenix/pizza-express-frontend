"use client";

import { Box } from "@chakra-ui/react";
import { useDashboard } from "@/hooks/useDashboard"; // O hook do dashboard agora só cuida da UI do dashboard

// Importando os componentes de suas novas localizações
import { DashboardContent } from "@/components/dashboard/DashboardContent"; // Este componente permanece onde está por enquanto
import { usePizzas } from "@/src/features/pizzas/hooks/usePizzas";
import { GerenciarCardapio } from "@/src/features/pizzas/components/GerenciarCardapio";
import { PizzaFormContainer } from "@/src/features/pizzas/components/PizzaFormContainer";

/**
 * Página do Dashboard.
 * Agora atua como um "Composition Root", orquestrando os hooks e componentes.
 */
export default function DashboardPage() {
  // Hook responsável APENAS pela navegação e estado da UI do Dashboard
  const dashboardHook = useDashboard();

  // Hook responsável por TODA a lógica de pizzas
  const pizzaHook = usePizzas();

  return (
    <Box w="full" minH="100vh" bg="gray.100">
      {dashboardHook.isGerenciarView ? (
        // Se a visão de "Gerenciar" estiver ativa, renderiza o componente de gerenciamento de cardápio
        <GerenciarCardapio
          onNavigateBack={dashboardHook.handleHideGerenciarCardapio}
          pizzaHook={pizzaHook} // Passamos o hook de pizzas inteiro para o componente filho
        />
      ) : (
        // Caso contrário, mostra o conteúdo principal do dashboard
        <DashboardContent {...dashboardHook} />
      )}

      {/* O Modal de formulário de pizza agora é controlado aqui na página, 
        usando o estado do hook de pizzas.
      */}
      <PizzaFormContainer
        isOpen={pizzaHook.isFormModalOpen}
        onClose={pizzaHook.handleCloseFormModal}
        pizzaToEdit={pizzaHook.pizzaToEdit}
        onSuccess={pizzaHook.handleSavePizza}
      />
    </Box>
  );
}
