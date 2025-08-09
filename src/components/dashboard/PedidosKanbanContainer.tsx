"use client";

import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  Flex,
  Tag,
  IconButton,
  Menu,
  VStack,
} from "@chakra-ui/react";
import { FiMoreVertical, FiArrowRight, FiCheck } from "react-icons/fi";
import { usePedidos } from "@/hooks/usePedidos";
import { Pedido, StatusPedido, statusConfig } from "@/types/pedidos";

const transicoesStatus: Record<StatusPedido, StatusPedido[]> = {
  [StatusPedido.PENDENTE]: [StatusPedido.EM_PREPARO],
  [StatusPedido.EM_PREPARO]: [StatusPedido.A_CAMINHO],
  [StatusPedido.A_CAMINHO]: [StatusPedido.ENTREGUE],
  [StatusPedido.ENTREGUE]: [],
  [StatusPedido.CANCELADO]: [],
};

const PedidoCard = ({
  pedido,
  onUpdateStatus,
}: {
  pedido: Pedido;
  onUpdateStatus: (pedidoId: number, status: StatusPedido) => void;
}) => {
  const proximosStatus = transicoesStatus[pedido.status];
  const isFuncionario = true; // Placeholder

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="sm">
      <Flex justify="space-between" align="center" mb={2}>
        <Heading size="sm">Pedido #{pedido.id}</Heading>
        {isFuncionario && proximosStatus.length > 0 && (
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton
                aria-label="Opções do Pedido"
                variant="ghost"
                size="sm"
              >
                <FiMoreVertical />
              </IconButton>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                {proximosStatus.map((status) => (
                  <Menu.Item
                    key={status}
                    value={status}
                    onClick={() => onUpdateStatus(pedido.id, status)}
                  >
                    <Flex align="center" gap="2">
                      {status === StatusPedido.ENTREGUE ? (
                        <FiCheck />
                      ) : (
                        <FiArrowRight />
                      )}
                      <Text>
                        Mover para &quot;{statusConfig[status].label}&quot;
                      </Text>
                    </Flex>
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        )}
      </Flex>
      <Text fontSize="sm" color="gray.600">
        Cliente: {pedido.user.nome}
      </Text>
      <Box mt={3}>
        {pedido.pizzas.map((pizza) => (
          <Text key={pizza.id} fontSize="sm">
            - {pizza.nome}
          </Text>
        ))}
      </Box>
    </Box>
  );
};

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
        mr={2}
      >
        {pedidos.length}
      </Tag.Root>
      <Heading size="md" color="gray.700">
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

export const PedidosKanbanContainer = () => {
  const { pedidos, isLoading, error, handleUpdateStatus } = usePedidos();

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="calc(100vh - 200px)">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" h="calc(100vh - 200px)">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  const pedidosPorStatus = (status: StatusPedido) =>
    pedidos.filter((p) => p.status === status);

  return (
    <Box p={{ base: 2, md: 5 }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="5">
        <KanbanColumn
          title="Pendentes"
          status={StatusPedido.PENDENTE}
          pedidos={pedidosPorStatus(StatusPedido.PENDENTE)}
          onUpdateStatus={handleUpdateStatus}
        />
        <KanbanColumn
          title="Em Preparo"
          status={StatusPedido.EM_PREPARO}
          pedidos={pedidosPorStatus(StatusPedido.EM_PREPARO)}
          onUpdateStatus={handleUpdateStatus}
        />
        <KanbanColumn
          title="A Caminho"
          status={StatusPedido.A_CAMINHO}
          pedidos={pedidosPorStatus(StatusPedido.A_CAMINHO)}
          onUpdateStatus={handleUpdateStatus}
        />
        <KanbanColumn
          title="Entregues"
          status={StatusPedido.ENTREGUE}
          pedidos={pedidosPorStatus(StatusPedido.ENTREGUE)}
          onUpdateStatus={handleUpdateStatus}
        />
      </SimpleGrid>
    </Box>
  );
};
