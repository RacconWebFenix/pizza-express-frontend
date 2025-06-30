"use client";

import { PedidosContent } from "./PedidosContent";
import { usePedidos } from "../../hooks/usePedidos";

export function PedidosContainer() {
  const {
    pedidos,
    selectedStatus,
    getStatusConfig,
    handleStatusFilter,
    filteredPedidos,
  } = usePedidos();

  return (
    <PedidosContent
      pedidos={pedidos}
      filteredPedidos={filteredPedidos}
      selectedStatus={selectedStatus}
      getStatusConfig={getStatusConfig}
      onStatusFilter={handleStatusFilter}
    />
  );
}
