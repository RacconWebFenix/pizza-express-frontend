"use client";

import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import { PedidoCard } from "./PedidoCard";
import type { StatusConfig } from "../../hooks/usePedidos";
import type { Pedido } from "../../types/pedidos";

interface PedidosGridProps {
  pedidos: Pedido[];
  getStatusConfig: (status: string) => StatusConfig;
}

export function PedidosGrid({ pedidos, getStatusConfig }: PedidosGridProps) {
  if (pedidos.length === 0) {
    return (
      <Box textAlign="center" py={12}>
        <Text color="gray.400" fontSize="lg">
          Nenhum pedido encontrado para este status.
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 4, md: 6 }}>
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
