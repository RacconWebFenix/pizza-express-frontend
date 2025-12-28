"use client";

import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { useProducts } from "@/features/produtos/hooks/useProducts";
import { ProductCard } from "@/features/produtos/components/ProductCard";
import { PizzaLoading } from "@/components/ui";
import { useCart } from "@/features/cart/context/CartContext";
import { toaster } from "@/components/ui/toaster";
import type { Product } from "@/types/product";

/**
 * Página do Cardápio.
 * Agora utiliza o hook centralizado 'usePizzas' para buscar e exibir os dados.
 */
export default function CardapioPage() {
  const { products, isLoading, error } = useProducts();
  const { addToCart } = useCart();

  // Função para adicionar produto ao carrinho
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toaster.create({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
      type: "success",
    });
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
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Grid>
    </Box>
  );
}
