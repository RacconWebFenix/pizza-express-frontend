"use client";

import { useEffect } from "react";
import {
  pizzaFormSchema,
  PizzaFormInputData,
  PizzaFormOutputData,
} from "@/utils/validation";
import { useForm } from "react-hook-form"; // Não precisamos mais do SubmitHandler aqui
import { zodResolver } from "@hookform/resolvers/zod";
import { PizzaForm } from "./PizzaForm";

import { CreatePizzaWithImageData, Pizza } from "@/types/pizzas";
import { AppModal } from "@/components/ui/AppModal";

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
  } = useForm<PizzaFormInputData>({
    resolver: zodResolver(pizzaFormSchema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      descricao: "",
      preco: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (pizzaToEdit) {
        reset({
          nome: pizzaToEdit.nome,
          descricao: pizzaToEdit.descricao || "",
          preco: String(pizzaToEdit.preco),
        });
      } else {
        reset({
          nome: "",
          descricao: "",
          preco: "",
        });
      }
    }
  }, [isOpen, pizzaToEdit, reset]);

  // Esta função, que lida com a lógica de negócio, permanece a mesma.
  const processSubmit = (data: PizzaFormOutputData) => {
    const dataToSend: CreatePizzaWithImageData = {
      ...data,
      image: data.image?.[0],
    };
    onSuccess(dataToSend, pizzaToEdit?.id);
  };

  // Função `onSubmit` aceita os dados como o `handleSubmit` os vê
  // (com `preco: unknown`) e usa o `safeParse` do Zod como uma "ponte segura" de tipagem.
  const onSubmit = (data: PizzaFormInputData) => {
    // Usamos `safeParse` para validar os dados novamente.
    // Isso serve como uma verificação em tempo de execução e, mais importante,
    // como um "type guard" para o TypeScript.
    const validationResult = pizzaFormSchema.safeParse(data);

    if (validationResult.success) {
      // Se a validação for bem-sucedida, `validationResult.data` agora
      // é GARANTIDO que seja do tipo `PizzaFormOutputData`, com `preco: number`.
      // Agora podemos chamar nossa função de lógica de negócio com segurança.
      processSubmit(validationResult.data);
    } else {
      // Este bloco é uma segurança. Teoricamente, o `zodResolver`
      // já deveria ter impedido dados inválidos de chegar até aqui.
      console.error(
        "A validação falhou dentro do onSubmit, o que não deveria acontecer:",
        validationResult.error
      );
    }
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={pizzaToEdit ? "Editar Pizza" : "Nova Pizza"}
    >
      <PizzaForm
        onSubmit={handleSubmit(onSubmit)} // Passamos a nova função segura
        register={register}
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        isEditing={!!pizzaToEdit}
        onCancel={onClose}
      />
    </AppModal>
  );
};
