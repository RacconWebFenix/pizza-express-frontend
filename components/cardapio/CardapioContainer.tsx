"use client";

import { CardapioLoading } from "./CardapioLoading";
import { CardapioError } from "./CardapioError";
import { CardapioContent } from "./CardapioContent";
import { useCardapio } from "../../hooks/useCardapio";

export function CardapioContainer() {
  const { pizzas, isLoading, error, handlePedir, handleVerPedidos } =
    useCardapio();

  if (isLoading) {
    return <CardapioLoading />;
  }

  if (error) {
    return <CardapioError error={error} />;
  }

  return (
    <CardapioContent
      pizzas={pizzas}
      totalPizzas={pizzas.length}
      onPedir={handlePedir}
      onVerPedidos={handleVerPedidos}
    />
  );
}
