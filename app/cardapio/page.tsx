"use client";

import {
  Box,
  Heading,
  VStack,
  SimpleGrid,
  Text,
  Spinner,
  Button,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPizzaSlice } from "react-icons/fa";
import { usePizzas } from "../../hooks/usePizzas";
import { formatCurrency } from "../../utils/format";

const MotionBox = motion(Box);

export default function CardapioPage() {
  const { pizzas, isLoading, error } = usePizzas();

  if (isLoading) {
    return (
      <Box textAlign="center" py={12}>
        <Spinner size="xl" color="brand.accent" />
        <Text mt={4} color="brand.medium">
          Carregando cardápio...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        bg="red.50"
        borderRadius="lg"
        p={4}
        border="2px"
        borderColor="red.200"
        textAlign="center"
      >
        <Text color="red.600" fontWeight="bold">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <VStack gap={8} align="stretch" w="full">
      {/* Header */}
      <Box textAlign="center" py={6}>
        <Heading color="brand.primary" size="2xl" mb={4}>
          <Flex align="center" justify="center" gap={3}>
            <Icon as={FaPizzaSlice} color="brand.pizza" />
            Nosso Cardápio
          </Flex>
        </Heading>
        <Text color="brand.medium" fontSize="lg">
          Pizzas artesanais feitas com ingredientes frescos e muito amor
        </Text>
        <Badge colorScheme="orange" fontSize="md" mt={2}>
          {pizzas.length} pizzas disponíveis
        </Badge>
      </Box>

      {/* Grid de Pizzas */}
      {pizzas.length === 0 ? (
        <Box textAlign="center" py={12}>
          <Text color="brand.medium" fontSize="lg">
            Nenhuma pizza encontrada no cardápio.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {pizzas.map((pizza, index) => (
            <MotionBox
              key={pizza.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <Box
                bg="white"
                borderRadius="xl"
                boxShadow="lg"
                overflow="hidden"
                border="2px"
                borderColor="gray.100"
                transition="all 0.2s"
                _hover={{
                  borderColor: "brand.pizza",
                  boxShadow: "xl",
                }}
              >
                {/* Header da Pizza */}
                <Box
                  bg="brand.light"
                  p={4}
                  borderBottom="1px"
                  borderColor="gray.200"
                >
                  <Heading size="lg" color="brand.primary" textAlign="center">
                    {pizza.nome}
                  </Heading>
                </Box>

                {/* Conteúdo */}
                <VStack p={6} gap={4} align="stretch">
                  <Text
                    color="brand.medium"
                    fontSize="md"
                    textAlign="center"
                    minH="60px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {pizza.descricao}
                  </Text>

                  <Flex justify="space-between" align="center">
                    <Text
                      color="brand.success"
                      fontSize="2xl"
                      fontWeight="bold"
                    >
                      {formatCurrency(pizza.preco)}
                    </Text>
                    <Button
                      bg="brand.pizza"
                      color="white"
                      size="md"
                      _hover={{ bg: "brand.accent" }}
                      onClick={() => console.log(`Pedindo: ${pizza.nome}`)}
                    >
                      Pedir
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
      )}

      {/* Footer Actions */}
      <Box bg="white" borderRadius="xl" boxShadow="lg" p={6} textAlign="center">
        <Heading size="md" color="brand.primary" mb={4}>
          Gostou do nosso cardápio?
        </Heading>
        <Text color="brand.medium" mb={4}>
          Faça seu pedido e desfrute das melhores pizzas da cidade!
        </Text>
        <Button
          bg="brand.success"
          color="white"
          size="lg"
          _hover={{ bg: "brand.accent" }}
          onClick={() => console.log("Ver todos os pedidos")}
        >
          Ver Meus Pedidos
        </Button>
      </Box>
    </VStack>
  );
}
