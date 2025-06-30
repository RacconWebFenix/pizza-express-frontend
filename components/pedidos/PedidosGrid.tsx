"use client";

import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import { PedidoCard } from "./PedidoCard";
import { PEDIDOS_CONSTANTS } from "../../constants/pedidos";
import type { StatusConfig } from "../../hooks/usePedidos";
import type { Pedido } from "../../types/pedidos";

interface PedidosGridProps {
  pedidos: Pedido[];
  getStatusConfig: (status: string) => StatusConfig;
}

export function PedidosGrid({ pedidos, getStatusConfig }: PedidosGridProps) {
  const { MESSAGES, GRID } = PEDIDOS_CONSTANTS;

  if (pedidos.length === 0) {
    return (
      <Box textAlign="center" py={12}>
        <Text color="brand.medium" fontSize="lg">
          {MESSAGES.NO_ORDERS}
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={GRID.COLUMNS} gap={GRID.GAP}>
      {pedidos.map((pedido, index) => (
        <PedidoCard
          key={pedido.id}
          pedido={pedido}
          statusConfig={getStatusConfig(pedido.status)}
          index={index}
        />
      ))}
    </SimpleGrid>
  );
}
