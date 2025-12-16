"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Pedido, StatusPedido } from "@/types/pedidos";

interface PedidoCardProps {
  pedido: Pedido;
  onUpdateStatus?: (pedidoId: number, status: StatusPedido) => void;
}

export const PedidoCard = ({ pedido, onUpdateStatus }: PedidoCardProps) => {

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      bg="background.primary"
      borderColor="background.tertiary"
      shadow="sm"
      draggable={!!onUpdateStatus}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', pedido.id.toString());
      }}
      cursor={onUpdateStatus ? 'grab' : 'default'}
      _active={{ cursor: onUpdateStatus ? 'grabbing' : 'default' }}
    >
      <Flex justify="space-between" align="center">
        <Box>
          {/* O Heading herdará a cor 'text.primary' do tema global */}
          <Heading size="md">Pedido #{pedido.id}</Heading>
          {/* ALTERADO: Cor do texto secundário */}
          <Text fontSize="sm" color="text.secondary">
            Cliente: {pedido.user.nome || "Cliente não identificado"}
          </Text>
        </Box>

      </Flex>

      <Box mt={3}>
        {pedido.pizzas.map((pizza) => (
          // O texto das pizzas também herdará a cor correta
          <Text key={pizza.id} fontSize="sm">
            - {pizza.nome}
          </Text>
        ))}
      </Box>
    </Box>
  );
};
