"use client";

import { Box, VStack } from "@chakra-ui/react";
import { usePizzas } from "../../hooks/usePizzas";
import { CardapioHeader } from "../../components/cardapio/CardapioHeader";
import { CardapioGrid } from "../../components/cardapio/CardapioGrid";
import { CardapioFooter } from "../../components/cardapio/CardapioFooter";
import { CardapioLoading } from "../../components/cardapio/CardapioLoading";
import { CardapioError } from "../../components/cardapio/CardapioError";

export default function CardapioPage() {
  const { pizzas, isLoading, error } = usePizzas();

  const handlePedir = (pizzaId: string, pizzaNome: string) => {
    console.log(`Pedindo: ${pizzaNome} (ID: ${pizzaId})`);
    // Aqui você implementará a lógica de pedido
  };

  const handleVerPedidos = () => {
    console.log("Ver todos os pedidos");
    // Aqui você implementará a navegação para pedidos
  };

  if (isLoading) {
    return <CardapioLoading />;
  }

  if (error) {
    return <CardapioError error={error} />;
  }

  return (
    <Box bg="yellow.200" minH="100vh" p={8}>
      <VStack gap={8} align="stretch" w="full" maxW="1200px" mx="auto">
        <CardapioHeader totalPizzas={pizzas.length} />
        <CardapioGrid pizzas={pizzas} onPedir={handlePedir} />
        <CardapioFooter onVerPedidos={handleVerPedidos} />
      </VStack>
    </Box>
  );
}
