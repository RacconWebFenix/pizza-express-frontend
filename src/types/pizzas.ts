// src/types/pizzas.ts

import { PizzaFormOutputData } from "@/utils/validation";

// A interface principal que representa uma Pizza vinda do backend (sem alterações)
export interface Pizza {
  id: number;
  nome: string;
  descricao: string | null;
  preco: number;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}
// Tipo para criação de pizza com imagem opcional
export type CreatePizzaWithImageData = Omit<PizzaFormOutputData, "image"> & {
  image?: File;
};
