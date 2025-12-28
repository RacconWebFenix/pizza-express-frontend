"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VStack, HStack, Button, Box } from "@chakra-ui/react";
import { AppModal } from "@/components/ui";
import { PizzaInput, PizzaTextarea, PizzaButton, PizzaSelect } from "@/components/ui";
import { useProdutos } from "../hooks/useProdutos";
import { useCategorias } from "../../categorias/hooks/useCategorias";
import { Produto } from "@/types/produto";

const produtoSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
  price: z.number().min(0.01, "Preço deve ser maior que zero"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  active: z.boolean(),
});

type ProdutoFormData = z.infer<typeof produtoSchema>;

interface ProdutoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  produto?: Produto | null;
}

export const ProdutoFormModal: React.FC<ProdutoFormModalProps> = ({
  isOpen,
  onClose,
  produto,
}) => {
  const { create, update } = useProdutos();
  const { categorias } = useCategorias();
  const isEditing = !!produto;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      active: true,
    },
  });

  // Preencher formulário quando estiver editando
  React.useEffect(() => {
    if (produto && isOpen) {
      setValue("name", produto.name);
      setValue("description", produto.description);
      setValue("price", produto.price);
      setValue("categoryId", produto.categoryId);
      setValue("active", produto.active);
    } else if (!produto && isOpen) {
      reset();
    }
  }, [produto, isOpen, setValue, reset]);

  const onSubmit = async (data: ProdutoFormData) => {
    try {
      if (isEditing && produto) {
        await update(produto.id, data);
      } else {
        await create(data);
      }
      onClose();
      reset();
    } catch {
      // Error já tratado no hook
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setValue("price", value);
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Editar Produto" : "Novo Produto"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4} align="stretch">
          <PizzaInput
            label="Nome do Produto"
            placeholder="Ex: Pizza Calabresa"
            {...register("name")}
            error={errors.name?.message}
          />

          <PizzaTextarea
            label="Descrição"
            placeholder="Descrição detalhada do produto"
            {...register("description")}
            error={errors.description?.message}
          />

          <HStack gap={4}>
            <PizzaInput
              label="Preço"
              type="number"
              step="0.01"
              placeholder="0,00"
              onChange={handlePriceChange}
              value={watch("price") || ""}
              error={errors.price?.message}
            />

            <Box flex={1}>
              <PizzaSelect
                label="Categoria"
                {...register("categoryId")}
                error={errors.categoryId?.message}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.name}
                  </option>
                ))}
              </PizzaSelect>
            </Box>
          </HStack>

          <HStack gap={4}>
            <Box flex={1}>
              <PizzaSelect
                label="Status"
                {...register("active")}
                defaultValue="true"
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </PizzaSelect>
            </Box>
          </HStack>

          <HStack gap={3} justify="flex-end" pt={4}>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <PizzaButton
              colorScheme="orange"
              type="submit"
              loading={isSubmitting}
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
