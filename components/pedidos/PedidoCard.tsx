"use client";

import { Flex, Icon, VStack, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { formatCurrency } from "../../utils/format";
import { PizzaCard, PizzaText, PizzaBadge } from "../ui";
https://nextjs.org/docs/app/getting-started
import type { Pedido } from "../../types/pedidos";

const MotionBox = motion(PizzaCard);

interface PedidoCardProps {
  pedido: Pedido;
  statusConfig: StatusConfig;
  index: number;
}

export function PedidoCard({ pedido, statusConfig, index }: PedidoCardProps) {
  // Calcula o total do pedido somando o preço das pizzas
  const total = pedido.pizzas.reduce((acc, pizza) => acc + pizza.preco, 0);
  // Extrai os nomes das pizzas para exibição
  const nomesDasPizzas = pedido.pizzas.map((p) => p.nome).join(", ");

  // Mapeia status do pedido para a variant do badge de forma segura
  const getBadgeVariant = (
    status: string
  ): "preparing" | "delivered" | "cancelled" | "default" => {
    switch (status) {
      case "em preparo":
        return "preparing";
      case "entregue":
        return "delivered";
      case "cancelado":
        return "cancelled";
      default:
        return "default";
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      bg="gray.800"
      color="white"
      p={6}
      borderRadius="xl"
      borderLeft="5px solid"
      borderColor={statusConfig.color || "gray.700"}
      overflow="hidden"
    >
      <VStack align="stretch" gap={4}>
        {/* Header do Card */}
        <Flex justify="space-between" align="center">
          <HStack>
            <Icon as={statusConfig.icon} color={statusConfig.color} />
            <PizzaText variant="heading" fontSize="lg" color="whiteAlpha.900">
              Pedido #{pedido.id.toString().padStart(4, "0")}
            </PizzaText>
          </HStack>
          <PizzaBadge variant={getBadgeVariant(pedido.status)}>
            {statusConfig.label}
          </PizzaBadge>
        </Flex>

        {/* Informações do Cliente */}
        <VStack align="stretch" gap={2}>
          <PizzaText variant="caption" color="whiteAlpha.600">
            Cliente
          </PizzaText>
          <PizzaText variant="body" fontWeight="medium" color="whiteAlpha.900">
            {pedido.user.nome}
          </PizzaText>
        </VStack>

        {/* Pizzas */}
        <VStack align="stretch" gap={2}>
          <PizzaText variant="caption" color="whiteAlpha.600">
            Pizzas
          </PizzaText>
          <PizzaText variant="body" color="whiteAlpha.800">
            {nomesDasPizzas}
          </PizzaText>
        </VStack>

        {/* Total e Horário */}
        <Flex justify="space-between" align="center">
          <VStack align="flex-start" gap={1}>
            <PizzaText variant="caption" color="whiteAlpha.600">
              Total
            </PizzaText>
            <PizzaText variant="heading" fontSize="lg" color="orange.400">
              {formatCurrency(total)}
            </PizzaText>
          </VStack>
          <VStack align="flex-end" gap={1}>
            <PizzaText variant="caption" color="whiteAlpha.600">
              Horário
            </PizzaText>
            <PizzaText variant="body" color="whiteAlpha.800">
              {pedido.horario}
            </PizzaText>
          </VStack>
        </Flex>
      </VStack>
    </MotionBox>
  );
}
