"use client";

import { Box, Heading, SimpleGrid, Tag, Flex, VStack } from "@chakra-ui/react";
import { Pedido, StatusPedido, statusConfig } from "@/types/pedidos";
import { PedidoCard } from "./PedidoCard";

interface PedidosKanbanProps {
  pedidos: Pedido[];
  onUpdateStatus: (pedidoId: number, status: StatusPedido) => void;
}

const KanbanColumn = ({
  title,
  status,
  pedidos,
  onUpdateStatus,
}: {
  title: string;
  status: StatusPedido;
  pedidos: Pedido[];
  onUpdateStatus: (pedidoId: number, status: StatusPedido) => void;
}) => (
  <Box bg="gray.50" p={4} borderRadius="md" minH="300px">
    <Flex align="center" mb={4}>
      <Tag.Root
        size="lg"
        variant="solid"
        colorScheme={statusConfig[status].colorScheme}
      >
        <Tag.Label>{pedidos.length}</Tag.Label>
      </Tag.Root>
      <Heading size="md" color="gray.700" ml={2}>
        {title}
      </Heading>
    </Flex>
    <VStack gap="4" align="stretch">
      {pedidos.map((pedido) => (
        <PedidoCard
          key={pedido.id}
          pedido={pedido}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </VStack>
  </Box>
);

export const PedidosKanban = ({
  pedidos,
  onUpdateStatus,
}: PedidosKanbanProps) => {
  const pedidosPorStatus = (status: StatusPedido) =>
    pedidos.filter((p) => p.status === status);

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="5">
        <KanbanColumn
          title="Pendentes"
          status={StatusPedido.PENDENTE}
          pedidos={pedidosPorStatus(StatusPedido.PENDENTE)}
          onUpdateStatus={onUpdateStatus}
        />
        <KanbanColumn
          title="Em Preparo"
          status={StatusPedido.EM_PREPARO}
          pedidos={pedidosPorStatus(StatusPedido.EM_PREPARO)}
          onUpdateStatus={onUpdateStatus}
        />
        <KanbanColumn
          title="A Caminho"
          status={StatusPedido.A_CAMINHO}
          pedidos={pedidosPorStatus(StatusPedido.A_CAMINHO)}
          onUpdateStatus={onUpdateStatus}
        />
        <KanbanColumn
          title="Entregues"
          status={StatusPedido.ENTREGUE}
          pedidos={pedidosPorStatus(StatusPedido.ENTREGUE)}
          onUpdateStatus={onUpdateStatus}
        />
      </SimpleGrid>
    </Box>
  );
};
