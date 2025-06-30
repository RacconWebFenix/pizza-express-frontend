"use client";

import { Box, VStack } from "@chakra-ui/react";
import { CardapioHeader } from "./CardapioHeader";
import { CardapioGrid } from "./CardapioGrid";
import { CardapioFooter } from "./CardapioFooter";
import { Pizza } from "../../types";
import { CARDAPIO_CONSTANTS } from "../../constants/cardapio";

interface CardapioContentProps {
  pizzas: Pizza[];
  totalPizzas: number;
  onPedir: (pizzaId: string, pizzaNome: string) => void;
  onVerPedidos: () => void;
}

export function CardapioContent({
  pizzas,
  totalPizzas,
  onPedir,
  onVerPedidos,
}: CardapioContentProps) {
  const { LAYOUT } = CARDAPIO_CONSTANTS;

  return (
    <Box
      bg={LAYOUT.BACKGROUND_COLOR}
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
        <CardapioGrid pizzas={pizzas} onPedir={onPedir} />
        <CardapioFooter onVerPedidos={onVerPedidos} />
      </VStack>
    </Box>
  );
}
