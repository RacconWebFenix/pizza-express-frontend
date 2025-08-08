"use client";

import { Grid } from "@chakra-ui/react";

import { Pizza } from "@/types";
import { PizzaCard } from "@/src/features/pizzas/components/PizzaCard";

interface PizzaGalleryProps {
  pizzas: Pizza[];
}

export function PizzaGallery({ pizzas }: PizzaGalleryProps) {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={6}
    >
      {pizzas.map((pizza) => (

        <PizzaCard key={pizza.id} pizza={pizza} onAddToCart={() => {}} />
      ))}
    </Grid>
  );
}
