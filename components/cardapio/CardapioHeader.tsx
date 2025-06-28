"use client";

import {
  Box,
  Heading,
  Text,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaPizzaSlice } from "react-icons/fa";

interface CardapioHeaderProps {
  totalPizzas: number;
}

export function CardapioHeader({ totalPizzas }: CardapioHeaderProps) {
  return (
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
        {totalPizzas} pizzas disponíveis
      </Badge>
    </Box>
  );
}