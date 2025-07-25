"use client";

import { usePedidos } from "../../hooks/usePedidos"; // <<<--- IMPORTE SEU HOOK AQUI
import { PedidosKanban } from "./PedidosKanban";

/**
 * Este componente busca os dados reais dos pedidos usando seu hook
 * e os passa para o componente de apresentação (PedidosKanban).
 */
export const PedidosKanbanContainer = () => {
  // Use seu hook para buscar os pedidos.
  // Assumi que ele retorna { pedidos, isLoading, error }.
  // Se os nomes forem diferentes, apenas ajuste aqui.
  const { pedidos, isLoading, error } = usePedidos();

  // Passa os dados reais para o componente de apresentação
  return (
    <PedidosKanban
      pedidos={pedidos || []}
      isLoading={isLoading}
      error={error}
    />
  );
};
