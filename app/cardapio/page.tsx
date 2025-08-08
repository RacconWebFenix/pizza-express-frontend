"use client";

import { Box, Grid, Heading, Text } from "@chakra-ui/react";

import { PizzaLoading } from "@/components/ui";
import { usePizzas } from "@/src/features/pizzas/hooks/usePizzas";
import { PizzaCard } from "@/src/features/pizzas/components/PizzaCard";

/**
 * Página do Cardápio.
 * Agora utiliza o hook centralizado 'usePizzas' para buscar e exibir os dados.
 */
export default function CardapioPage() {
  const { pizzas, isLoading, error } = usePizzas();

  // Função placeholder para o botão "Adicionar"
  const handleAddToCart = (pizzaId: number) => {
    console.log(`Pizza ${pizzaId} adicionada ao carrinho!`);
    // Aqui viria a lógica para adicionar ao estado do carrinho
  };

  if (isLoading) {
    return <PizzaLoading message="Carregando nosso delicioso cardápio..." />;
  }

  if (error) {
    return <Text color="red.500">Ocorreu um erro: {error}</Text>;
  }

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Nosso Cardápio
      </Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={8}
      >
        {pizzas.map((pizza) => (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Grid>
    </Box>
  );
}
