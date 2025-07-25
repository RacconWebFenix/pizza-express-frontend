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
import { Pedido } from "../../types"; // Assumindo que você tem um tipo "Pedido"

// Configurações visuais das colunas
const statusConfig = {
  NOVO: { colorScheme: "blue", label: "Novos Pedidos" },
  EM_PREPARO: { colorScheme: "yellow", label: "Em Preparo" },
  PRONTO_PARA_ENTREGA: { colorScheme: "green", label: "Pronto p/ Entrega" },
  FINALIZADO: { colorScheme: "gray", label: "Finalizados" },
};

// Card individual para cada pedido
const PedidoCard = ({ pedido }: { pedido: Pedido }) => (
  <Box
    bg="white"
    p={4}
    borderRadius="lg"
    boxShadow="md"
    _dark={{ bg: "gray.700" }}
    w="100%"
  >
    <Flex justify="space-between" align="center">
      <Text fontWeight="bold" color="gray.800" _dark={{ color: "white" }}>
        Pedido #{pedido.id.slice(0, 8)}...
      </Text>
      <Text fontWeight="bold" color="brand.primary">
        R$ {pedido.total.toFixed(2)}
      </Text>
    </Flex>
    <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
      {pedido.cliente.nome}
    </Text>
    {/* Adicione aqui um botão ou menu para alterar o status, se desejar */}
  </Box>
);

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
    bg="gray.100"
    _dark={{ bg: "gray.800" }}
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
      >
        <Text fontWeight="bold">{pedidos.length}</Text>
      </Badge>
      <Heading size="sm" color="gray.600" _dark={{ color: "gray.300" }}>
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
      <Flex justify="center" align="center" h="200px">
        <Spinner size="xl" />
        <Text ml={4}>Carregando pedidos...</Text>
      </Flex>
    );
  }

  if (error) {
    return <Text color="red.500">Erro ao carregar pedidos: {error}</Text>;
  }

  return (
    <Box>
      <Heading size="lg" color="gray.700" _dark={{ color: "white" }} mb={4}>
        Painel de Pedidos
      </Heading>
      <Flex
        gap={6}
        overflowX="auto"
        pb={4}
        css={{
          "&::-webkit-scrollbar": { height: "8px" },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "10px",
            _dark: { background: "#2d3748" },
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#c4c4c4",
            borderRadius: "10px",
            _dark: { background: "#4a5568" },
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
