"use client";

import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { formatCurrency } from "../../utils/format";

const MotionBox = motion(Box);

interface PizzaCardProps {
  pizza: {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
  };
  index: number;
  onPedir: (pizzaId: string, pizzaNome: string) => void;
}

export function PizzaCard({ pizza, index, onPedir }: PizzaCardProps) {
  return (
    <MotionBox
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
              onClick={() => onPedir(pizza.id, pizza.nome)}
            >
              Pedir
            </Button>
          </Flex>
        </VStack>
      </Box>
    </MotionBox>
  );
}