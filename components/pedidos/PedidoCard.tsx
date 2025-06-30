"use client";

import { Flex, Icon, VStack, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { formatCurrency } from "../../utils/format";
import { PEDIDOS_CONSTANTS } from "../../constants/pedidos";
import { PizzaCard, PizzaText, PizzaBadge } from "../ui";
import type { StatusConfig } from "../../hooks/usePedidos";
import type { Pedido } from "../../types/pedidos";

const MotionBox = motion(PizzaCard);

interface PedidoCardProps {
  pedido: Pedido;
  statusConfig: StatusConfig;
  index: number;
}

export function PedidoCard({ pedido, statusConfig, index }: PedidoCardProps) {
  const { ANIMATIONS } = PEDIDOS_CONSTANTS;
  
  // Mapeia status para variant do card
  const getCardVariant = (status: string) => {
    switch (status) {
      case 'entregue':
        return 'success';
      case 'preparando':
        return 'warning';
      case 'cancelado':
        return 'danger';
      default:
        return 'default';
    }
  };

  // Mapeia status para variant do badge
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'entregue':
        return 'delivered';
      case 'preparando':
        return 'preparing';
      case 'cancelado':
        return 'cancelled';
      default:
        return 'default';
    }
  };

  return (
    <MotionBox
      initial={ANIMATIONS.FADE_IN.initial}
      animate={ANIMATIONS.FADE_IN.animate}
      transition={{ ...ANIMATIONS.FADE_IN.transition, delay: index * 0.1 }}
      variant={getCardVariant(pedido.status)}
      p={6}
    >
      <VStack align="stretch" gap={4}>
        {/* Header do Card */}
        <Flex justify="space-between" align="center">
          <HStack>
            <Icon as={statusConfig.icon} color={statusConfig.color} />
            <PizzaText variant="heading" fontSize="lg">
              Pedido #{pedido.id}
            </PizzaText>
          </HStack>
          <PizzaBadge variant={getBadgeVariant(pedido.status)}>
            {statusConfig.label}
          </PizzaBadge>
        </Flex>

        {/* Informações do Cliente */}
        <VStack align="stretch" gap={2}>
          <PizzaText variant="caption">
            Cliente
          </PizzaText>
          <PizzaText variant="body" fontWeight="medium">
            {pedido.cliente}
          </PizzaText>
        </VStack>

        {/* Pizzas */}
        <VStack align="stretch" gap={2}>
          <PizzaText variant="caption">
            Pizzas
          </PizzaText>
          <PizzaText variant="body">
            {pedido.pizzas.join(", ")}
          </PizzaText>
        </VStack>

        {/* Total e Horário */}
        <Flex justify="space-between" align="center">
          <VStack align="flex-start" gap={1}>
            <PizzaText variant="caption">
              Total
            </PizzaText>
            <PizzaText variant="heading" fontSize="lg">
              {formatCurrency(pedido.total)}
            </PizzaText>
          </VStack>
          <VStack align="flex-end" gap={1}>
            <PizzaText variant="caption">
              Horário
            </PizzaText>
            <PizzaText variant="body">
              {pedido.horario}
            </PizzaText>
          </VStack>
        </Flex>
      </VStack>
    </MotionBox>
  );
}
