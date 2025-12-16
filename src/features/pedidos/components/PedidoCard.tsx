"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Pedido, StatusPedido, statusConfig } from "@/types/pedidos";

interface PedidoCardProps {
  pedido: Pedido;
  onUpdateStatus?: (pedidoId: number, status: StatusPedido) => void;
  viewMode?: "kanban" | "grid";
}

export const PedidoCard = ({ pedido, onUpdateStatus, viewMode = "kanban" }: PedidoCardProps) => {

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
      <Flex justify="space-between" align="flex-start" gap={3}>
        <Box flex={1}>
          {/* O Heading herdará a cor 'text.primary' do tema global */}
          <Heading size="md">Pedido #{pedido.id}</Heading>
          {/* ALTERADO: Cor do texto secundário */}
          <Text fontSize="sm" color="text.secondary">
            Cliente: {pedido.user.nome || "Cliente não identificado"}
          </Text>
        </Box>

        {viewMode === "grid" && (
          <Box
            px={3}
            py={2}
            borderRadius="md"
            fontSize="xs"
            fontWeight="700"
            textAlign="center"
            minW="80px"
            bg={
              pedido.status === "PENDENTE"
                ? "#f3e8e8"
                : pedido.status === "EM_PREPARO"
                ? "#fff3e0"
                : pedido.status === "A_CAMINHO"
                ? "#e3f2fd"
                : pedido.status === "ENTREGUE"
                ? "#e8f5e9"
                : "#ffebee"
            }
            color={
              pedido.status === "PENDENTE"
                ? "#d32f2f"
                : pedido.status === "EM_PREPARO"
                ? "#f57c00"
                : pedido.status === "A_CAMINHO"
                ? "#1976d2"
                : pedido.status === "ENTREGUE"
                ? "#388e3c"
                : "#c62828"
            }
            border="1px solid"
            borderColor={
              pedido.status === "PENDENTE"
                ? "#ef5350"
                : pedido.status === "EM_PREPARO"
                ? "#ffb74d"
                : pedido.status === "A_CAMINHO"
                ? "#64b5f6"
                : pedido.status === "ENTREGUE"
                ? "#81c784"
                : "#ef5350"
            }
          >
            {statusConfig[pedido.status].label}
          </Box>
        )}
      </Flex>

      <Box mt={3}>
        {pedido.pizzas.map((pizza) => (
          // O texto das pizzas também herdará a cor correta
          <Text key={pizza.id} fontSize="sm">
            - {pizza.nome}
          </Text>
        ))}
      </Box>

      {onUpdateStatus && viewMode === "grid" && (
        <Box mt={3}>
          <select
            value={pedido.status}
            onChange={(e) => onUpdateStatus(pedido.id, e.target.value as StatusPedido)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid #4b5563',
              backgroundColor: '#2d3748',
              fontSize: '0.875rem',
              color: '#e2e8f0',
              fontFamily: 'Roboto, sans-serif',
              transition: 'all 0.2s',
            }}
          >
            {Object.values(StatusPedido).map((status) => (
              <option key={status} value={status}>
                {statusConfig[status].label}
              </option>
            ))}
          </select>
        </Box>
      )}
    </Box>
  );
};
