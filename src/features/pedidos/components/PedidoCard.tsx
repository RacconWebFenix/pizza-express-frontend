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
import { FiMoreVertical, FiArrowRight, FiCheck } from "react-icons/fi";
import { Pedido, StatusPedido, statusConfig } from "@/types/pedidos";
import { motion } from "framer-motion";
import { usePermissions } from "@/hooks/usePermissions";

const transicoesStatus: Record<StatusPedido, StatusPedido[]> = {
  [StatusPedido.PENDENTE]: [StatusPedido.EM_PREPARO],
  [StatusPedido.EM_PREPARO]: [StatusPedido.A_CAMINHO],
  [StatusPedido.A_CAMINHO]: [StatusPedido.ENTREGUE],
  [StatusPedido.ENTREGUE]: [],
  [StatusPedido.CANCELADO]: [],
};

interface PedidoCardProps {
  pedido: Pedido;
  onUpdateStatus?: (pedidoId: number, status: StatusPedido) => void;
}

const MotionBox = motion(Box);

export const PedidoCard = ({ pedido, onUpdateStatus }: PedidoCardProps) => {
  const proximosStatus = transicoesStatus[pedido.status];
  const { canUpdateOrderStatus } = usePermissions();

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      // ALTERADO: Estilos alinhados com o tema escuro
      bg="background.primary"
      borderColor="background.tertiary"
      shadow="sm"
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

        {canUpdateOrderStatus() &&
          onUpdateStatus &&
          proximosStatus.length > 0 && (
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
                {/* O Menu.Content herdará os estilos de fundo e cor corretos do tema */}
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
          // O texto das pizzas também herdará a cor correta
          <Text key={pizza.id} fontSize="sm">
            - {pizza.nome}
          </Text>
        ))}
      </Box>
    </MotionBox>
  );
};
