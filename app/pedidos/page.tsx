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
        color: "brand.warning",
        icon: FaClock,
        label: "Preparando",
        bgColor: "brand.cream",
        borderColor: "brand.pizza",
        badgeScheme: "yellow",
      };
    case "entregue":
      return {
        color: "brand.success",
        icon: FaCheckCircle,
        label: "Entregue",
        bgColor: "#F0FDF4", // Verde muito claro
        borderColor: "brand.fresh",
        badgeScheme: "green",
      };
    case "cancelado":
      return {
        color: "brand.error",
        icon: FaTimes,
        label: "Cancelado",
        bgColor: "#FEF2F2", // Vermelho muito claro
        borderColor: "brand.error",
        badgeScheme: "red",
      };
    default:
      return {
        color: "brand.medium",
        icon: FaClock,
        label: "Desconhecido",
        bgColor: "brand.light",
        borderColor: "gray.300",
        badgeScheme: "gray",
      };
  }
};

export default function PedidosPage() {
  return (
    <VStack gap={8} align="stretch" w="full">
      {/* Header */}
      <Box textAlign="center" py={6}>
        <Heading color="brand.primary" size="2xl" mb={4}>
          <Flex align="center" justify="center" gap={3}>
            <Icon as={FaShoppingCart} color="brand.accent" />
            Meus Pedidos
          </Flex>
        </Heading>
        <Text color="brand.medium" fontSize="lg">
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
          <Heading size="lg" color="brand.primary" mb={2}>
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
                  borderRadius="2xl"
                  boxShadow="md"
                  border="1px"
                  borderColor={statusConfig.borderColor}
                  overflow="hidden"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    boxShadow: "2xl",
                    transform: "translateY(-4px)",
                    borderColor: "brand.accent",
                  }}
                >
                  {/* Header do Pedido */}
                  <Flex
                    bg={statusConfig.bgColor}
                    p={5}
                    justify="space-between"
                    align="center"
                    borderBottom="1px"
                    borderColor="gray.100"
                  >
                    <Flex align="center" gap={4}>
                      <Badge
                        colorScheme={statusConfig.badgeScheme}
                        fontSize="sm"
                        px={4}
                        py={2}
                        borderRadius="full"
                        textTransform="none"
                        fontWeight="600"
                        boxShadow="sm"
                      >
                        <Icon as={statusConfig.icon} mr={2} />
                        {statusConfig.label}
                      </Badge>
                      <Text
                        fontWeight="700"
                        color="brand.primary"
                        fontSize="lg"
                      >
                        Pedido #{pedido.id}
                      </Text>
                    </Flex>
                    <Text fontSize="sm" color="brand.medium" fontWeight="500">
                      {pedido.data} às {pedido.hora}
                    </Text>
                  </Flex>

                  {/* Conteúdo do Pedido */}
                  <VStack p={6} align="stretch" gap={5}>
                    <VStack align="flex-start" gap={3}>
                      <Text
                        fontWeight="700"
                        color="brand.primary"
                        fontSize="md"
                      >
                        Itens do Pedido:
                      </Text>
                      <VStack align="stretch" gap={2} w="full">
                        {pedido.pizzas.map((pizza, pizzaIndex) => (
                          <Flex
                            key={pizzaIndex}
                            align="center"
                            gap={3}
                            p={3}
                            bg="brand.light"
                            borderRadius="lg"
                            border="1px"
                            borderColor="gray.100"
                          >
                            <Icon
                              as={FaShoppingCart}
                              color="brand.pizza"
                              boxSize={5}
                            />
                            <Text color="brand.dark" fontWeight="500" flex="1">
                              {pizza}
                            </Text>
                          </Flex>
                        ))}
                      </VStack>
                    </VStack>

                    <Box h="1px" bg="gray.200" w="full" />

                    <Flex
                      justify="space-between"
                      align="center"
                      flexWrap="wrap"
                      gap={4}
                    >
                      <Text fontSize="2xl" fontWeight="800" color="brand.fresh">
                        Total: R$ {pedido.total.toFixed(2)}
                      </Text>
                      <Flex gap={3}>
                        {pedido.status === "preparando" && (
                          <Button
                            size="md"
                            colorScheme="red"
                            variant="outline"
                            borderRadius="lg"
                            fontWeight="600"
                          >
                            Cancelar
                          </Button>
                        )}
                        <Button
                          size="md"
                          bg="brand.accent"
                          color="white"
                          borderRadius="lg"
                          fontWeight="600"
                          _hover={{ bg: "brand.primary" }}
                        >
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
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
        p={8}
        textAlign="center"
        border="1px"
        borderColor="gray.100"
      >
        <Heading size="lg" color="brand.primary" mb={4} fontWeight="700">
          Quer fazer um novo pedido?
        </Heading>
        <Text color="brand.medium" mb={6} fontSize="lg">
          Confira nosso cardápio e escolha suas pizzas favoritas!
        </Text>
        <Flex gap={4} justify="center" wrap="wrap">
          <Button
            bg="brand.pizza"
            color="white"
            size="lg"
            borderRadius="xl"
            px={8}
            py={6}
            fontSize="lg"
            fontWeight="600"
            _hover={{ bg: "brand.accent", transform: "translateY(-2px)" }}
            transition="all 0.3s"
            boxShadow="md"
          >
            Ver Cardápio
          </Button>
          <Button
            variant="outline"
            borderColor="brand.accent"
            color="brand.accent"
            size="lg"
            borderRadius="xl"
            px={8}
            py={6}
            fontSize="lg"
            fontWeight="600"
            _hover={{
              bg: "brand.light",
              transform: "translateY(-2px)",
              borderColor: "brand.primary",
            }}
            transition="all 0.3s"
          >
            Pedidos Anteriores
          </Button>
        </Flex>
      </Box>
    </VStack>
  );
}
