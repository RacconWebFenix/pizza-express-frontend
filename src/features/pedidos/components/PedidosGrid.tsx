"use client";

import {
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { Order, OrderStatus } from "@/types/order";
import { PedidoCard } from "./PedidoCard";

interface PedidosGridProps {
  pedidos?: Order[];
  onUpdateStatus?: (pedidoId: number, status: OrderStatus) => void;
}

export const PedidosGrid = ({
  pedidos = [],
  onUpdateStatus,
}: PedidosGridProps) => {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap="4">
        {pedidos.map((pedido) => (
          <PedidoCard
            key={pedido.id}
            pedido={pedido}
            onUpdateStatus={onUpdateStatus}
            viewMode="grid"
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};