"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  Menu,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiMoreVertical, FiArrowRight, FiCheck } from "react-icons/fi";
// Importando os tipos e a lógica de transição que já existem
import { Pedido, StatusPedido, statusConfig } from "@/types/pedidos";

// Mapeia as transições de status permitidas no frontend (lógica de negócio)
const transicoesStatus: Record<StatusPedido, StatusPedido[]> = {
  [StatusPedido.PENDENTE]: [StatusPedido.EM_PREPARO],
  [StatusPedido.EM_PREPARO]: [StatusPedido.A_CAMINHO],
  [StatusPedido.A_CAMINHO]: [StatusPedido.ENTREGUE],
  [StatusPedido.ENTREGUE]: [],
  [StatusPedido.CANCELADO]: [],
};

// A interface de props agora aceita a função de atualização
interface PedidoCardProps {
  pedido: Pedido;
  onUpdateStatus: (pedidoId: number, status: StatusPedido) => void;
}

const MotionBox = motion(Box);

export const PedidoCard = ({ pedido, onUpdateStatus }: PedidoCardProps) => {
  // Determina quais são os próximos status possíveis para este pedido
  const proximosStatus = transicoesStatus[pedido.status];
  const isFuncionario = true; // Placeholder para sua lógica de permissão

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      bg="white"
      shadow="sm"
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="md">Pedido #{pedido.id}</Heading>
          <Text fontSize="sm" color="gray.600">
            Cliente: {pedido.user.nome}
          </Text>
        </Box>

        {/* O menu de ações só aparece se o usuário for autorizado e se houver um próximo status */}
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
                      <Icon
                        as={
                          status === StatusPedido.ENTREGUE
                            ? FiCheck
                            : FiArrowRight
                        }
                      />
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

      <Box mt={3}>
        {pedido.pizzas.map((pizza) => (
          <Text key={pizza.id} fontSize="sm">
            - {pizza.nome}
          </Text>
        ))}
      </Box>
    </MotionBox>
  );
};
