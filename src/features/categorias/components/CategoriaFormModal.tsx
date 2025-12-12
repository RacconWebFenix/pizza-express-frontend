"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VStack, HStack, Button } from "@chakra-ui/react";
import { AppModal } from "@/components/ui";
import { PizzaInput, PizzaButton } from "@/components/ui";
import { useCategorias } from "../hooks/useCategorias";
import {
  Categoria,
  CreateCategoriaData,
  UpdateCategoriaData,
} from "@/types/categoria";

const categoriaSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  slug: z
    .string()
    .min(1, "Slug é obrigatório")
    .max(100, "Slug deve ter no máximo 100 caracteres"),
});

type CategoriaFormData = z.infer<typeof categoriaSchema>;

interface CategoriaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoria?: Categoria | null;
}

export const CategoriaFormModal: React.FC<CategoriaFormModalProps> = ({
  isOpen,
  onClose,
  categoria,
}) => {
  const { create, update } = useCategorias();
  const isEditing = !!categoria;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<CategoriaFormData>({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  // Preencher formulário quando estiver editando
  React.useEffect(() => {
    if (categoria && isOpen) {
      setValue("name", categoria.name);
      setValue("slug", categoria.slug);
    } else if (!categoria && isOpen) {
      reset();
    }
  }, [categoria, isOpen, setValue, reset]);

  const onSubmit = async (data: CategoriaFormData) => {
    try {
      if (isEditing && categoria) {
        await update(categoria.id, data);
      } else {
        await create(data);
      }
      onClose();
      reset();
    } catch (error) {
      // Error já tratado no hook
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .replace(/-+/g, "-") // Remove hífens consecutivos
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = generateSlug(name);
    setValue("name", name);
    setValue("slug", slug);
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Editar Categoria" : "Nova Categoria"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4} align="stretch">
          <PizzaInput
            label="Nome da Categoria"
            placeholder="Ex: Pizzas Salgadas"
            {...register("name")}
            error={errors.name?.message}
            onChange={handleNameChange}
          />

          <PizzaInput
            label="Slug"
            placeholder="Ex: pizzas-salgadas"
            {...register("slug")}
            error={errors.slug?.message}
            helperText="Slug é gerado automaticamente baseado no nome"
          />

          <HStack gap={3} justify="flex-end" pt={4}>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <PizzaButton
              colorScheme="orange"
              type="submit"
              isLoading={isSubmitting}
              loadingText={isEditing ? "Salvando..." : "Criando..."}
            >
              {isEditing ? "Salvar" : "Criar"}
            </PizzaButton>
          </HStack>
        </VStack>
      </form>
    </AppModal>
  );
};
