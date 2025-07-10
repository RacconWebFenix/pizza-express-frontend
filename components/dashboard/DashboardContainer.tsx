"use client";

import { DashboardContent } from "./DashboardContent";
import { useDashboard } from "../../hooks/useDashboard";
import { PizzaLoading, PizzaText } from "../ui"; // Importe seus componentes de feedback

export function DashboardContainer() {
  // CORREÇÃO: Usando os nomes corretos e atualizados do hook
  const {
    stats,
    isGerenciarView,
    isLoading,
    error,
    handleNavigateToPedidos,
    handleShowGerenciarCardapio,
    handleHideGerenciarCardapio,
  } = useDashboard();

  // Adicionando os estados de loading e erro que vêm do hook
  if (isLoading) {
    return <PizzaLoading message="Carregando dados do dashboard..." />;
  }

  if (error) {
    return (
      <PizzaText variant="danger" textAlign="center">
        {error}
      </PizzaText>
    );
  }

  return (
    // CORREÇÃO: Passando as props com os nomes corretos para o DashboardContent
    <DashboardContent
      stats={stats}
      showGerenciarCardapio={isGerenciarView}
      onShowGerenciarCardapio={handleShowGerenciarCardapio}
      onHideGerenciarCardapio={handleHideGerenciarCardapio}
      onNavigateToPedidos={handleNavigateToPedidos}
    />
  );
}
