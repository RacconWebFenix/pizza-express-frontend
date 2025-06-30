"use client";

import { Box, VStack } from "@chakra-ui/react";
import { PedidosHeader } from "./PedidosHeader";
import { PedidosGrid } from "./PedidosGrid";
import { PEDIDOS_CONSTANTS } from "../../constants/pedidos";
import type { StatusConfig } from "../../hooks/usePedidos";
import type { Pedido } from "../../types/pedidos";

interface PedidosContentProps {
  pedidos: Pedido[];
  filteredPedidos: Pedido[];
  selectedStatus: string;
  getStatusConfig: (status: string) => StatusConfig;
  onStatusFilter: (status: string) => void;
}

export function PedidosContent({
  pedidos,
  filteredPedidos,
  selectedStatus,
  getStatusConfig,
  onStatusFilter,
}: PedidosContentProps) {
  const { LAYOUT } = PEDIDOS_CONSTANTS;

  return (
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
        <PedidosHeader
          totalPedidos={pedidos.length}
          selectedStatus={selectedStatus}
          onStatusFilter={onStatusFilter}
        />
        <PedidosGrid
          pedidos={filteredPedidos}
          getStatusConfig={getStatusConfig}
        />
      </VStack>
    </Box>
  );
}
