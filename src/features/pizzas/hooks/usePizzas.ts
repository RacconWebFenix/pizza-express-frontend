"use client";

import { useState, useCallback, useEffect } from "react";

import {
  createPizza,
  deletePizza,
  getPizzas,
  updatePizza,
} from "../services/pizzasService";

import { toaster } from "@/components/ui/toaster";
import { CreatePizzaWithImageData, Pizza } from "@/types/pizzas";

export type UsePizzasReturn = ReturnType<typeof usePizzas>;

/**
 * Hook com a Responsabilidade Única de gerenciar todo o estado e lógica de negócio
 * relacionados a Pizzas. Substitui o useCardapio e a lógica de pizza do useDashboard.
 */
export const usePizzas = () => {
  // --- ESTADO ---
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para o modal de criação/edição (antes no useDashboard)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [pizzaToEdit, setPizzaToEdit] = useState<Pizza | null>(null);

  // --- LÓGICA DE DADOS (API) ---
  const fetchPizzas = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getPizzas();
      setPizzas(data);
      setError(null);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Erro ao carregar pizzas.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  // --- HANDLERS DE AÇÕES (CRUD) ---
  const handleDelete = async (pizzaId: number) => {
    // Adicionaremos um try-catch aqui para robustez
    try {
      await deletePizza(pizzaId);
      setPizzas((prevPizzas) => prevPizzas.filter((p) => p.id !== pizzaId));
      toaster.create({
        title: "Sucesso!",
        description: "Pizza deletada.",
        type: "success",
      });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Não foi possível deletar.";
      toaster.create({ title: "Erro", description: msg, type: "error" });
    }
  };

  const handleSavePizza = async (
    formData: CreatePizzaWithImageData,
    pizzaId?: number
  ) => {
    try {
      const action = pizzaId
        ? updatePizza(pizzaId, formData)
        : createPizza(formData);
      await action;

      const successMessage = pizzaId
        ? "Pizza atualizada com sucesso."
        : "Pizza criada com sucesso.";
      toaster.create({
        title: "Sucesso!",
        description: successMessage,
        type: "success",
      });

      handleCloseFormModal();
      fetchPizzas(); // Re-busca a lista de pizzas para refletir a mudança
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Não foi possível salvar a pizza.";
      toaster.create({ title: "Erro", description: msg, type: "error" });
    }
  };

  // --- HANDLERS DE UI (Modal) ---
  const handleOpenFormModal = (pizza: Pizza | null = null) => {
    setPizzaToEdit(pizza);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setPizzaToEdit(null);
  };

  return {
    // Dados
    pizzas,
    isLoading,
    error,
    // Estado do Modal
    isFormModalOpen,
    pizzaToEdit,
    // Funções
    refetch: fetchPizzas,
    handleDelete,
    handleSavePizza,
    handleOpenFormModal,
    handleCloseFormModal,
  };
};
