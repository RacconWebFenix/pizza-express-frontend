"use client";

import {
  SimpleGrid,
  Box,
  Text,
} from "@chakra-ui/react";
import { PizzaCard } from "./PizzaCard";

interface Pizza {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
}

interface CardapioGridProps {
  pizzas: Pizza[];
  onPedir: (pizzaId: string, pizzaNome: string) => void;
}

export function CardapioGrid({ pizzas, onPedir }: CardapioGridProps) {
  if (pizzas.length === 0) {
    return (
      <Box textAlign="center" py={12}>
        <Text color="brand.medium" fontSize="lg">
          Nenhuma pizza encontrada no cardápio.
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
      {pizzas.map((pizza, index) => (
        <PizzaCard
          key={pizza.id}
          pizza={pizza}
          index={index}
          onPedir={onPedir}
        />
      ))}
    </SimpleGrid>
  );
}