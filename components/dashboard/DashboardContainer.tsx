"use client";

import { DashboardContent } from "./DashboardContent";
import { useDashboard } from "../../hooks/useDashboard";

export function DashboardContainer() {
  const {
    stats,
    showCreateForm,
    handleNavigateToCardapio,
    handleNavigateToPedidos,
    handleShowCreateForm,
    handleHideCreateForm,
    handlePizzaCreated,
  } = useDashboard();

  return (
    <DashboardContent
      stats={stats}
      showCreateForm={showCreateForm}
      onNavigateToCardapio={handleNavigateToCardapio}
      onNavigateToPedidos={handleNavigateToPedidos}
      onShowCreateForm={handleShowCreateForm}
      onHideCreateForm={handleHideCreateForm}
      onPizzaCreated={handlePizzaCreated}
    />
  );
}
