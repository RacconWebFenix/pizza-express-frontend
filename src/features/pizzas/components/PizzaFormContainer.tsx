// src/components/PizzaForm/PizzaFormContainer.tsx

"use client";

import { useEffect } from "react";
import { PizzaFormData, pizzaFormSchema } from "@/utils/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PizzaForm } from "./PizzaForm";
import { PizzaModal } from "@/components/ui/PizzaModal";
import { CreatePizzaWithImageData, Pizza } from "@/types/pizzas";

interface PizzaFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: CreatePizzaWithImageData, pizzaId?: number) => void;
  pizzaToEdit: Pizza | null;
  isLoading?: boolean;
  apiError: string | null;
}

export const PizzaFormContainer = ({
  isOpen,
  onClose,
  onSuccess,
  pizzaToEdit,
}: PizzaFormContainerProps) => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PizzaFormData>({
    resolver: zodResolver(pizzaFormSchema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      descricao: "",
      preco: 0,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (pizzaToEdit) {
        reset({
          nome: pizzaToEdit.nome,
          descricao: pizzaToEdit.descricao || "",
          preco: pizzaToEdit.preco,
        });
      } else {
        reset({ nome: "", descricao: "", preco: 0 });
      }
    }
  }, [isOpen, pizzaToEdit, reset]);

  const processSubmit = (data: PizzaFormData) => {
    const dataToSend: CreatePizzaWithImageData = {
      ...data,
      image: data.image?.[0],
    };
    onSuccess(dataToSend, pizzaToEdit?.id);
  };

  return (
    <PizzaModal
      isOpen={isOpen}
      onClose={onClose}
      title={pizzaToEdit ? "Editar Pizza" : "Nova Pizza"}
    >
      <PizzaForm
        onSubmit={handleSubmit(processSubmit)}
        register={register}
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        isEditing={!!pizzaToEdit}
        onCancel={onClose}
      />
    </PizzaModal>
  );
};
