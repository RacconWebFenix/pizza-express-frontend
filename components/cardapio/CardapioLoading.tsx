"use client";

import { PizzaLoading } from "@/components/ui";

export function CardapioLoading() {
  return (
    <PizzaLoading
      message="Carregando cardápio..."
      isVisible={true}
      fullscreen={true}
      showMessage={true}
    />
  );
}
