"use client";

import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { mockPedidos } from "@/mock";

const MotionBox = motion(Box);

const getStatusConfig = (status: string) => {
  switch (status) {
    case "preparando":
      return {
        color: "orange",
        icon: FaClock,
        label: "Preparando",
        bgColor: "orange.50",
        borderColor: "orange.200",
      };
    case "entregue":
      return {
        color: "green",
        icon: FaCheckCircle,
        label: "Entregue",
        bgColor: "green.50",
        borderColor: "green.200",
      };
    case "cancelado":
      return {
        color: "red",
        icon: FaTimes,
        label: "Cancelado",
        bgColor: "red.50",
        borderColor: "red.200",
      };
    default:
      return {
        color: "gray",
        icon: FaClock,
        label: "Desconhecido",
        bgColor: "gray.50",
        borderColor: "gray.200",
      };
  }
};

export default function PedidosPage() {
  return (
    <VStack gap={8} align="stretch" w="full">
      {/* Header */}
      <Box textAlign="center" py={6}>
        <Heading color="brand.red" size="2xl" mb={4}>
          <Flex align="center" justify="center" gap={3}>
            <Icon as={FaShoppingCart} color="brand.green" />
            Meus Pedidos
          </Flex>
        </Heading>
        <Text color="brand.charcoal" fontSize="lg">
          Acompanhe o status dos seus pedidos
        </Text>
        <Badge colorScheme="blue" fontSize="md" mt={2}>
          {mockPedidos.length} pedidos encontrados
        </Badge>
      </Box>

      {/* Lista de Pedidos */}
      {mockPedidos.length === 0 ? (
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          p={12}
          textAlign="center"
        >
          <Icon as={FaShoppingCart} boxSize={16} color="gray.300" mb={4} />
          <Heading size="lg" color="brand.charcoal" mb={2}>
            Nenhum pedido encontrado
          </Heading>
          <Text color="gray.600" mb={6}>
            Que tal fazer seu primeiro pedido?
          </Text>
          <Button colorScheme="red" size="lg">
            Ver Cardápio
          </Button>
        </Box>
      ) : (
        <VStack gap={6} align="stretch">
          {mockPedidos.map((pedido, index) => {
            const statusConfig = getStatusConfig(pedido.status);

            return (
              <MotionBox
                key={pedido.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  bg="white"
                  borderRadius="xl"
                  boxShadow="lg"
                  border="2px"
                  borderColor={statusConfig.borderColor}
                  overflow="hidden"
                  transition="all 0.2s"
                  _hover={{
                    boxShadow: "xl",
                    transform: "translateY(-2px)",
                  }}
                >
                  {/* Header do Pedido */}
                  <Flex
                    bg={statusConfig.bgColor}
                    p={4}
                    justify="space-between"
                    align="center"
                  >
                    <Flex align="center" gap={3}>
                      <Badge
                        colorScheme={statusConfig.color}
                        fontSize="sm"
                        px={3}
                        py={1}
                        borderRadius="full"
                      >
                        <Icon as={statusConfig.icon} mr={1} />
                        {statusConfig.label}
                      </Badge>
                      <Text fontWeight="bold" color="brand.charcoal">
                        Pedido #{pedido.id}
                      </Text>
                    </Flex>
                    <Text fontSize="sm" color="gray.600">
                      {pedido.data} às {pedido.hora}
                    </Text>
                  </Flex>

                  {/* Conteúdo do Pedido */}
                  <VStack p={6} align="stretch" gap={4}>
                    <VStack align="flex-start" gap={2}>
                      <Text fontWeight="bold" color="brand.charcoal">
                        Itens do Pedido:
                      </Text>
                      {pedido.pizzas.map((pizza, pizzaIndex) => (
                        <Flex key={pizzaIndex} align="center" gap={2}>
                          <Icon
                            as={FaShoppingCart}
                            color="brand.green"
                            boxSize={4}
                          />
                          <Text color="brand.charcoal">{pizza}</Text>
                        </Flex>
                      ))}
                    </VStack>

                    <Box h="1px" bg="gray.200" w="full" />

                    <Flex justify="space-between" align="center">
                      <Text fontSize="xl" fontWeight="bold" color="brand.green">
                        Total: R$ {pedido.total.toFixed(2)}
                      </Text>
                      <Flex gap={2}>
                        {pedido.status === "preparando" && (
                          <Button size="sm" colorScheme="red" variant="outline">
                            Cancelar
                          </Button>
                        )}
                        <Button size="sm" colorScheme="blue" variant="outline">
                          Ver Detalhes
                        </Button>
                      </Flex>
                    </Flex>
                  </VStack>
                </Box>
              </MotionBox>
            );
          })}
        </VStack>
      )}

      {/* Actions Footer */}
      <Box bg="white" borderRadius="xl" boxShadow="lg" p={6} textAlign="center">
        <Heading size="md" color="brand.red" mb={4}>
          Quer fazer um novo pedido?
        </Heading>
        <Text color="brand.charcoal" mb={4}>
          Confira nosso cardápio e escolha suas pizzas favoritas!
        </Text>
        <Flex gap={4} justify="center" wrap="wrap">
          <Button colorScheme="green" size="lg">
            Ver Cardápio
          </Button>
          <Button colorScheme="blue" variant="outline" size="lg">
            Pedidos Anteriores
          </Button>
        </Flex>
      </Box>
    </VStack>
  );
}
