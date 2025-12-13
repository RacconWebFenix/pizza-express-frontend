"use client";

import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { PedidoMesa } from "@/types/mesa";

interface PedidoCardProps {
  pedido: PedidoMesa;
  index: number;
}

export const PedidoCard: React.FC<PedidoCardProps> = ({ pedido, index }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Box key={index} p={3} bg="blackAlpha.400" borderRadius="md">
      <HStack justify="space-between" align="start">
        <Box flex={1}>
          <Text fontSize="sm" color="gray.600">
            {new Date(pedido.criadoEm).toLocaleString("pt-BR")}
          </Text>
          {pedido.observacoes && (
            <Text fontSize="sm" color="gray.500" mt={1}>
              Obs: {pedido.observacoes}
            </Text>
          )}
          <Text fontSize="sm" mt={2}>
            {pedido.itens.map((item, idx) => (
              <span key={idx}>
                {item.quantity}x {item.product?.name || "Produto"}
                {idx < pedido.itens.length - 1 ? ", " : ""}
              </span>
            ))}
          </Text>
        </Box>
        <Text fontWeight="semibold">
          {formatPrice(
            pedido.itens.reduce(
              (total, item) =>
                total + (item.product?.price || 0) * item.quantity,
              0
            )
          )}
        </Text>
      </HStack>
    </Box>
  );
};
