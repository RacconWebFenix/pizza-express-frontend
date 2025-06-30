"use client";

import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import { PizzaCard } from "./PizzaCard";
import { Pizza } from "../../types";
import { CARDAPIO_CONSTANTS } from "../../constants/cardapio";

interface CardapioGridProps {
  pizzas: Pizza[];
  onPedir: (pizzaId: string, pizzaNome: string) => void;
}

export function CardapioGrid({ pizzas, onPedir }: CardapioGridProps) {
  const { MESSAGES, GRID } = CARDAPIO_CONSTANTS;

  if (pizzas.length === 0) {
    return (
      <Box textAlign="center" py={12}>
        <Text color="brand.medium" fontSize="lg">
          {MESSAGES.EMPTY_MENU}
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={GRID.COLUMNS} gap={GRID.GAP}>
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
