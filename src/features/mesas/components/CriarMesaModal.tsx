"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VStack, HStack, Text, Button, Box } from "@chakra-ui/react";
import { AppModal } from "@/components/ui";
import { PizzaInput, PizzaButton } from "@/components/ui";

const criarMesaSchema = z.object({
  number: z
    .number()
    .min(1, "Número deve ser maior que 0")
    .max(999, "Número deve ser menor que 1000"),
});

type CriarMesaFormData = z.infer<typeof criarMesaSchema>;

interface CriarMesaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCriarMesa: (numero: number) => Promise<void>;
  mesasExistentes: number[];
}

export const CriarMesaModal: React.FC<CriarMesaModalProps> = ({
  isOpen,
  onClose,
  onCriarMesa,
  mesasExistentes,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm<CriarMesaFormData>({
    resolver: zodResolver(criarMesaSchema),
    defaultValues: {
      number: Math.max(...mesasExistentes, 0) + 1,
    },
  });

  const onSubmit = async (data: CriarMesaFormData) => {
    // Verificar se o número já existe
    if (mesasExistentes.includes(data.number)) {
      setError("number", {
        type: "manual",
        message: `Mesa ${data.number} já existe`,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onCriarMesa(data.number);
      reset();
    } catch (error) {
      // Error já tratado no componente pai
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setValue("number", value);
  };

  return (
    <AppModal isOpen={isOpen} onClose={handleClose} title="Criar Nova Mesa">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4} align="stretch">
          <PizzaInput
            label="Número da Mesa"
            type="number"
            placeholder="Ex: 5"
            {...register("number", { valueAsNumber: true })}
            onChange={handleNumberChange}
            error={errors.number?.message}
          />

          <HStack gap={3} justify="flex-end" pt={4}>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
                <PizzaButton
                  colorScheme="orange"
                  type="submit"
                  loading={isSubmitting}
                  loadingText="Criando mesa..."
                >
              Criar Mesa
            </PizzaButton>
          </HStack>
        </VStack>
      </form>
    </AppModal>
  );
};
