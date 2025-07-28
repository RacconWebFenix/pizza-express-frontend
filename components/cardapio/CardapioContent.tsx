"use client";

import { Box, VStack } from "@chakra-ui/react";
import { CardapioHeader } from "./CardapioHeader";
import { PizzaGallery } from "./PizzaGallery";
import { CardapioFooter } from "./CardapioFooter";
import { Pizza } from "../../types";
import { CARDAPIO_CONSTANTS } from "../../constants/cardapio";

interface CardapioContentProps {
  pizzas: Pizza[];
  totalPizzas: number;
  isLoading: boolean;
  error: string | null;
  onPedir: (pizzaId: string, pizzaNome: string) => void;
  onVerPedidos: () => void;
}

export function CardapioContent({
  pizzas,
  totalPizzas,
  isLoading,
  error,
  onPedir,
  onVerPedidos,
}: CardapioContentProps) {
  const { LAYOUT } = CARDAPIO_CONSTANTS;

  return (
    <Box
      bgGradient="linear(to-br, yellow.100, orange.100)"
      minH={LAYOUT.MIN_HEIGHT}
      p={LAYOUT.PADDING}
    >
      <VStack
        gap={LAYOUT.GAP}
        align="stretch"
        w="full"
        maxW={LAYOUT.MAX_WIDTH}
        mx="auto"
      >
        <CardapioHeader totalPizzas={totalPizzas} />
        <PizzaGallery
          pizzas={pizzas}
          isLoading={isLoading}
          error={error}
          onPedir={onPedir}
          title="🍕 Nosso Cardápio"
          emptyMessage="Nenhuma pizza disponível no momento"
        />
        <CardapioFooter onVerPedidos={onVerPedidos} />
      </VStack>
    </Box>
  );
}
