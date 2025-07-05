"use client";

import { CardapioContent } from "./CardapioContent";
import { useCardapio } from "../../hooks/useCardapio";

export function CardapioContainer() {
  const { pizzas, isLoading, error, handlePedir, handleVerPedidos } =
    useCardapio();

  return (
    <CardapioContent
      pizzas={pizzas}
      totalPizzas={pizzas.length}
      isLoading={isLoading}
      error={error}
      onPedir={handlePedir}
      onVerPedidos={handleVerPedidos}
    />
  );
}
