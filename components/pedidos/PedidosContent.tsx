"use client";

import { Box, VStack } from "@chakra-ui/react";
import { PedidosHeader } from "./PedidosHeader";
import { PedidosGrid } from "./PedidosGrid";
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
  return (
    <Box bg="gray.900" minH="100vh" p={{ base: 4, md: 8 }}>
      <VStack
        gap={{ base: 6, md: 8 }}
        align="stretch"
        w="full"
        maxW="1200px"
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
