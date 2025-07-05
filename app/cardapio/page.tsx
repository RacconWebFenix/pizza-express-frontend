"use client";

import { CardapioContainer } from "../../components/cardapio";

/**
 * Página principal do cardápio
 *
 * Esta página é responsável apenas por renderizar o container do cardápio,
 * seguindo o princípio de responsabilidade única.
 *
 * Proteção: Middleware + Layout do cardápio
 */
export default function CardapioPage() {
  return <CardapioContainer />;
}
