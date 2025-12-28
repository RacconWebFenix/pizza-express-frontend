"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LayoutGrid, KanbanSquare } from "lucide-react";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { usePermissions } from "@/hooks/usePermissions";
import { PedidosKanban } from "./PedidosKanban";
import { PedidosGrid } from "./PedidosGrid";
import { PedidosFilters } from "./PedidosFilters";
import { PizzaLoading } from "@/components/ui";
import { Order, OrderStatus } from "@/types/order";

type ViewMode = "kanban" | "grid";

/**
 * Componente "Container" ou "Layout" da página de Pedidos.
 * Responsabilidade Única: Orquestrar a lógica da página e passar os dados
 * do hook para os componentes de UI.
 * Usa o hook correto baseado nas permissões do usuário.
 */
export const PedidosPageLayout = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [statusFilters, setStatusFilters] = useState<OrderStatus[]>([]);
  const [clienteFilter, setClienteFilter] = useState<string>("");
  const [pedidoFilter, setPedidoFilter] = useState<string>("");
  const { canViewAllOrders } = usePermissions();

  // Usa o hook unificado
  const ordersHook = useOrders({
    adminMode: canViewAllOrders(),
  });

  const { orders, isLoading } = ordersHook;

  // handleUpdateStatus só existe para funcionários/admins
  const handleUpdateStatus = canViewAllOrders()
    ? ordersHook.updateOrderStatus
    : undefined;

  // Filtrar pedidos baseado nos filtros ativos
  const filteredPedidos = orders.filter((pedido: Order) => {
    const statusMatch =
      statusFilters.length === 0 || statusFilters.includes(pedido.status);
    const clienteMatch = !clienteFilter || true; // TODO: Implementar filtragem por cliente quando houver API
    const pedidoMatch =
      !pedidoFilter || pedido.id.toString().includes(pedidoFilter);

    return statusMatch && clienteMatch && pedidoMatch;
  });

  return (
    <VStack w="full" p={{ base: 4, md: 8 }} gap={6} align="stretch">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="xl">
          {canViewAllOrders() ? "Gestão de Pedidos" : "Meus Pedidos"}
        </Heading>
        <Flex gap={2}>
          <Button
            onClick={() => setViewMode("kanban")}
            variant={viewMode === "kanban" ? "solid" : "outline"}
          >
            <Flex align="center" gap="2">
              <Icon as={KanbanSquare} />
              <Text>Kanban</Text>
            </Flex>
          </Button>
          {/* CORREÇÃO: Ícone colocado dentro do botão */}
          <Button
            onClick={() => setViewMode("grid")}
            variant={viewMode === "grid" ? "solid" : "outline"}
          >
            <Flex align="center" gap="2">
              <Icon as={LayoutGrid} />
              <Text>Grade</Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>

      {isLoading ? (
        <PizzaLoading message="Carregando pedidos..." />
      ) : (
        <>
          <PedidosFilters
            statusFilters={statusFilters}
            clienteFilter={clienteFilter}
            pedidoFilter={pedidoFilter}
            onStatusChange={setStatusFilters}
            onClienteChange={setClienteFilter}
            onPedidoChange={setPedidoFilter}
          />

          {filteredPedidos.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Text color="text.secondary">
                Nenhum pedido encontrado com os filtros aplicados
              </Text>
            </Box>
          ) : (
            <Box>
              {viewMode === "kanban" ? (
                <PedidosKanban
                  pedidos={filteredPedidos}
                  onUpdateStatus={handleUpdateStatus}
                />
              ) : (
                <PedidosGrid
                  pedidos={filteredPedidos}
                  onUpdateStatus={handleUpdateStatus}
                />
              )}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};
