"use client";

import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Badge,
  Spinner, // Para indicar loading
} from "@chakra-ui/react";
import { Pedido } from "../../types";

// 1. Mapeamento de status do backend para o frontend
const statusConfig = {
  novo: { colorScheme: "blue", label: "Novos" },
  "em preparo": { colorScheme: "yellow", label: "Em Preparo" },
  entregue: { colorScheme: "green", label: "Entregues" },
  cancelado: { colorScheme: "red", label: "Cancelados" },
};

// Card individual para cada pedido
const PedidoCard = ({ pedido }: { pedido: Pedido }) => {
  // Calcula o total do pedido somando o preço das pizzas
  const total = pedido.pizzas.reduce((acc, pizza) => acc + pizza.preco, 0);

  return (
    <Box
      bg="gray.800"
      color="white"
      p={4}
      borderRadius="lg"
      boxShadow="md"
      w="100%"
    >
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold" color="whiteAlpha.900">
          Pedido #{pedido.id.toString().padStart(4, "0")}
        </Text>
        <Text fontWeight="bold" color="orange.400">
          R$ {total.toFixed(2)}
        </Text>
      </Flex>
      <Text fontSize="sm" color="whiteAlpha.700" mt={2}>
        {pedido.cliente.nome}
      </Text>
    </Box>
  );
};

interface KanbanColumnProps {
  title: string;
  pedidos: Pedido[];
  colorScheme: string;
}
// Coluna do Kanban
const KanbanColumn = ({ title, pedidos, colorScheme }: KanbanColumnProps) => (
  <VStack
    align="stretch"
    p={4}
    bg="gray.900"
    borderRadius="xl"
    w="full"
    minH="300px"
  >
    <HStack>
      <Badge
        size="lg"
        colorScheme={colorScheme}
        variant="solid"
        borderRadius="full"
        px={3}
        py={1}
      >
        <Text fontWeight="bold">{pedidos.length}</Text>
      </Badge>
      <Heading size="sm" color="whiteAlpha.800">
        {title}
      </Heading>
    </HStack>
    <VStack pt={4} gap={4}>
      {pedidos.map((pedido: Pedido) => (
        <PedidoCard key={pedido.id} pedido={pedido} />
      ))}
    </VStack>
  </VStack>
);

// Interface para as props do componente principal
interface PedidosKanbanProps {
  pedidos: Pedido[];
  isLoading: boolean;
  error: string | null;
}

// Componente principal de apresentação
export const PedidosKanban = ({
  pedidos,
  isLoading,
  error,
}: PedidosKanbanProps) => {
  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="200px" color="whiteAlpha.800">
        <Spinner size="xl" />
        <Text ml={4}>Carregando pedidos...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Text color="red.400" textAlign="center" py={10}>
        Erro ao carregar pedidos: {error}
      </Text>
    );
  }

  return (
    <Box>
      <Heading size="lg" color="whiteAlpha.900" mb={6} textAlign="center">
        Painel de Pedidos
      </Heading>
      <Flex
        gap={6}
        overflowX="auto"
        pb={4}
        css={{
          "&::-webkit-scrollbar": { height: "8px" },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
          },
        }}
      >
        {Object.entries(statusConfig).map(([status, config]) => (
          <Box key={status} minW={{ base: "300px", md: "320px" }} flex="1">
            <KanbanColumn
              title={config.label}
              colorScheme={config.colorScheme}
              pedidos={pedidos.filter((p) => p.status === status)}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
