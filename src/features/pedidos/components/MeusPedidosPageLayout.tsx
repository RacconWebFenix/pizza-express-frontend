"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  Grid,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaClock, FaCheckCircle, FaTruck, FaTimesCircle } from "react-icons/fa";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { PizzaCard, PizzaLoading } from "@/components/ui";
import { formatCurrency } from "@/utils/format";
import type { Order } from "@/types/order";

/**
 * Função simples para formatar data.
 */
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Componente para exibir o status do pedido com ícone e cor apropriados.
 */
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDENTE":
        return { color: "yellow", icon: FaClock, label: "Pendente" };
      case "EM_PREPARO":
        return { color: "blue", icon: FaClock, label: "Em Preparo" };
      case "PRONTO":
        return { color: "green", icon: FaCheckCircle, label: "Pronto" };
      case "A_CAMINHO":
        return { color: "purple", icon: FaTruck, label: "A Caminho" };
      case "ENTREGUE":
        return { color: "green", icon: FaCheckCircle, label: "Entregue" };
      case "CANCELADO":
        return { color: "red", icon: FaTimesCircle, label: "Cancelado" };
      default:
        return { color: "gray", icon: FaClock, label: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge colorScheme={config.color} variant="subtle" px={3} py={1}>
      <Flex align="center" gap={2}>
        <Icon as={config.icon} />
        <Text>{config.label}</Text>
      </Flex>
    </Badge>
  );
};

/**
 * Componente para exibir um pedido individual.
 */
const PedidoCard = ({ pedido }: { pedido: Order }) => {
  const totalItems = pedido.items?.length || 0;
  const totalValor = parseFloat(pedido.total) || 0;

  return (
    <PizzaCard className="p-6">
      <Flex justify="space-between" align="start" mb={4}>
        <Box>
          <Heading size="md" mb={2}>
            Pedido #{pedido.id}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            {formatDate(pedido.createdAt)}
          </Text>
        </Box>
        <StatusBadge status={pedido.status} />
      </Flex>

      <Box mb={4}>
        <Text fontWeight="medium" mb={2}>
          {totalItems} item{totalItems !== 1 ? "s" : ""}
        </Text>
        <VStack align="start" gap={1}>
          {pedido.items?.map((item, index) => (
            <Text key={index} fontSize="sm" color="gray.600">
              • {item.product.name} (x{item.quantity}) - {formatCurrency(parseFloat(item.subtotal))}
            </Text>
          ))}
        </VStack>
      </Box>

      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="sm" color="gray.600">
            Tipo: {pedido.type === 'DELIVERY' ? 'Entrega' : 'Mesa'}
          </Text>
        </Box>
        <Box textAlign="right">
          <Text fontWeight="bold" fontSize="lg">
            {formatCurrency(totalValor)}
          </Text>
        </Box>
      </Flex>
    </PizzaCard>
  );
};

/**
 * Layout principal da página "Meus Pedidos".
 * Mostra o histórico de pedidos do usuário logado.
 */
export const MeusPedidosPageLayout = () => {
  const { orders, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <Box p={{ base: 4, md: 8 }}>
        <PizzaLoading message="Carregando seus pedidos..." />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={{ base: 4, md: 8 }}>
        <Text color="red.500">Erro ao carregar pedidos: {error}</Text>
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <VStack gap={6} align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={2}>
            Meus Pedidos
          </Heading>
          <Text color="gray.600">
            Acompanhe o status de todos os seus pedidos
          </Text>
        </Box>

        {orders.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Text fontSize="lg" color="gray.500" mb={4}>
              Você ainda não fez nenhum pedido.
            </Text>
            <Text color="gray.400">
              Que tal experimentar uma de nossas deliciosas pizzas?
            </Text>
          </Box>
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {orders.map((pedido) => (
              <PedidoCard key={pedido.id} pedido={pedido} />
            ))}
          </Grid>
        )}
      </VStack>
    </Box>
  );
};
