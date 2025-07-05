"use client";

import { PizzaLoading } from "../ui";

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
