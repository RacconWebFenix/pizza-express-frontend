"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VStack, HStack, Button } from "@chakra-ui/react";
import { AppModal } from "@/components/ui";
import { PizzaInput, PizzaButton } from "@/components/ui";
import { useEntregadores } from "../hooks/useEntregadores";
import { Entregador } from "@/types/entregador";

const entregadorSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  telefone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(
      /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
      "Formato inválido. Use (XX) XXXXX-XXXX"
    ),
});

type EntregadorFormData = z.infer<typeof entregadorSchema>;

interface EntregadorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  entregador?: Entregador | null;
}

export const EntregadorFormModal: React.FC<EntregadorFormModalProps> = ({
  isOpen,
  onClose,
  entregador,
}) => {
  const { create, update } = useEntregadores();
  const isEditing = !!entregador;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<EntregadorFormData>({
    resolver: zodResolver(entregadorSchema),
    defaultValues: {
      nome: "",
      telefone: "",
    },
  });

  // Preencher formulário quando estiver editando
  React.useEffect(() => {
    if (entregador && isOpen) {
      setValue("nome", entregador.nome);
      setValue(
        "telefone",
        entregador.telefone ? formatPhoneForDisplay(entregador.telefone) : ""
      );
    } else if (!entregador && isOpen) {
      reset();
    }
  }, [entregador, isOpen, setValue, reset]);

  const onSubmit = async (data: EntregadorFormData) => {
    try {
      const formattedData = {
        ...data,
        telefone: cleanPhoneNumber(data.telefone),
      };

      if (isEditing && entregador) {
        await update(entregador.id, formattedData);
      } else {
        await create(formattedData);
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

  const cleanPhoneNumber = (phone: string): string => {
    return phone.replace(/\D/g, "");
  };

  const formatPhoneForDisplay = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length <= 11) {
      if (value.length <= 2) {
        value = value;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
      }
    }

    setValue("telefone", value);
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Editar Entregador" : "Novo Entregador"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4} align="stretch">
          <PizzaInput
            label="Nome do Entregador"
            placeholder="Ex: João Silva"
            {...register("nome")}
            error={errors.nome?.message}
          />

          <PizzaInput
            label="Telefone"
            placeholder="(11) 99999-9999"
            {...register("telefone")}
            onChange={handlePhoneChange}
            error={errors.telefone?.message}
            maxLength={15}
          />

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
