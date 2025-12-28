"use client";

import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Card,
  Badge,
  Heading,
} from "@chakra-ui/react";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { PizzaLoading } from "@/components/ui";
import { Order } from "@/types/order";

/**
 * Componente para exibir pedidos de mesa (DINE_IN)
 * Mostra pedidos agrupados por mesa
 */
export const TablesList: React.FC = () => {
  const { orders, isLoading } = useOrders({
    adminMode: true,
    orderType: "DINE_IN",
  });

  // Agrupar pedidos por mesa
  const ordersByTable = orders.reduce((acc, order) => {
    const tableNumber = order.session?.table?.number || 0;
    if (!acc[tableNumber]) {
      acc[tableNumber] = [];
    }
    acc[tableNumber].push(order);
    return acc;
  }, {} as Record<number, Order[]>);

  if (isLoading) {
    return <PizzaLoading message="Carregando pedidos de mesa..." />;
  }

  return (
    <VStack w="full" p={{ base: 4, md: 8 }} gap={6} align="stretch">
      <Heading as="h1" size="xl">
        🍽️ Pedidos de Mesa
      </Heading>

      {Object.keys(ordersByTable).length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="text.secondary">Nenhum pedido de mesa encontrado</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {Object.entries(ordersByTable).map(([tableNumber, tableOrders]) => (
            <Card.Root key={tableNumber} size="sm">
              <Card.Header>
                <HStack justify="space-between">
                  <Heading size="md">Mesa {tableNumber}</Heading>
                  <Badge colorScheme="blue">
                    {tableOrders.length} pedido
                    {tableOrders.length !== 1 ? "s" : ""}
                  </Badge>
                </HStack>
              </Card.Header>
              <Card.Body>
                <VStack gap={3} align="stretch">
                  {tableOrders.map((order) => (
                    <Box
                      key={order.id}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      bg="background.secondary"
                    >
                      <HStack justify="space-between" mb={2}>
                        <Text fontWeight="bold">Pedido #{order.id}</Text>
                        <Badge
                          colorScheme={
                            order.status === "PENDENTE"
                              ? "gray"
                              : order.status === "EM_PREPARO"
                              ? "yellow"
                              : order.status === "PRONTO"
                              ? "green"
                              : "red"
                          }
                        >
                          {order.status}
                        </Badge>
                      </HStack>

                      <Text fontSize="sm" color="text.secondary" mb={2}>
                        👤 {order.user?.nome || "Cliente"}
                      </Text>

                      <VStack gap={1} align="stretch" mb={2}>
                        {order.items.map((item) => (
                          <Text key={item.id} fontSize="sm">
                            {item.quantity}x {item.product.name}
                          </Text>
                        ))}
                      </VStack>

                      <Text fontWeight="bold" color="brand.primary">
                        Total: R$ {order.total}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};
