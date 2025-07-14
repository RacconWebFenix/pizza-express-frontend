"use client";

import { DashboardContent } from "./DashboardContent";
import { useDashboard } from "../../hooks/useDashboard";
import { PizzaLoading, PizzaText } from "../ui";

/**
 * Componente "Container" que atua como uma ponte limpa entre a lógica (hook)
 * e a apresentação (DashboardContent).
 * SOLID: Sua única responsabilidade é orquestrar essa conexão.
 */
export function DashboardContainer() {
  // 1. Consome o hook e obtém TODAS as suas props em um único objeto.
  //    Isso inclui os novos estados e handlers dos modais.
  const dashboardProps = useDashboard();

  // 2. A lógica de loading e erro, que lida com estados da UI, permanece aqui.
  if (dashboardProps.isLoading) {
    return <PizzaLoading message="Carregando dados do dashboard..." />;
  }

  if (dashboardProps.error) {
    return (
      <PizzaText variant="danger" textAlign="center">
        {dashboardProps.error}
      </PizzaText>
    );
  }

  // 3. Passa TODAS as props do hook diretamente para o DashboardContent.
  //    Esta abordagem é limpa, simples e fácil de manter. Se você adicionar
  //    algo novo no hook, não precisa mudar nada neste arquivo.
  return <DashboardContent {...dashboardProps} />;
}
