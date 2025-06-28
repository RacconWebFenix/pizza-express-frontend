"use client";

import { useState } from "react";
import {
  createPizzaWithImage,
  uploadImageToPizza,
  createPizza,
  updatePizza,
  deletePizza,
} from "@/services/pizza-service";
import { validateImageFile, validatePizzaData } from "@/utils/validation";
import type { CreatePizzaWithImageData, Pizza } from "@/types";

interface UsePizzaActionsReturn {
  // Estados
  isLoading: boolean;
  error: string | null;

  // Ações para pizza com imagem
  createWithImage: (data: CreatePizzaWithImageData) => Promise<Pizza | null>;
  uploadImage: (pizzaId: string, image: File) => Promise<Pizza | null>;

  // Ações tradicionais
  create: (data: {
    nome: string;
    descricao: string;
    preco: number;
  }) => Promise<Pizza | null>;
  update: (
    id: string,
    data: { nome?: string; descricao?: string; preco?: number }
  ) => Promise<Pizza | null>;
  remove: (id: string) => Promise<{ message: string } | null>;

  // Utilitários
  validateImage: (file: File) => { isValid: boolean; error?: string };
  validateData: (data: { nome: string; descricao: string; preco: number }) => {
    isValid: boolean;
    errors: string[];
  };
  clearError: () => void;
}

export const usePizzaActions = (): UsePizzaActionsReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const createWithImage = async (data: CreatePizzaWithImageData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validar dados da pizza
      const dataValidation = validatePizzaData({
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
      });

      if (!dataValidation.isValid) {
        throw new Error(dataValidation.errors.join(", "));
      }

      // Validar arquivo de imagem
      const imageValidation = validateImageFile(data.imagem);
      if (!imageValidation.isValid) {
        throw new Error(imageValidation.error);
      }

      const result = await createPizzaWithImage(data);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar pizza com imagem";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (pizzaId: string, image: File) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validar arquivo de imagem
      const imageValidation = validateImageFile(image);
      if (!imageValidation.isValid) {
        throw new Error(imageValidation.error);
      }

      const result = await uploadImageToPizza(pizzaId, image);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao fazer upload da imagem";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const create = async (data: {
    nome: string;
    descricao: string;
    preco: number;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validar dados da pizza
      const dataValidation = validatePizzaData(data);
      if (!dataValidation.isValid) {
        throw new Error(dataValidation.errors.join(", "));
      }

      const result = await createPizza(data);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar pizza";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (
    id: string,
    data: { nome?: string; descricao?: string; preco?: number }
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await updatePizza(id, data);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar pizza";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await deletePizza(id);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao deletar pizza";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createWithImage,
    uploadImage,
    create,
    update,
    remove,
    validateImage: validateImageFile,
    validateData: validatePizzaData,
    clearError,
  };
};
