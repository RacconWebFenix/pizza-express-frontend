"use client";

import { PizzaFileInput, PizzaInput, PizzaTextarea } from "@/components/ui";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  Field,
} from "@chakra-ui/react";
import { FormEvent } from "react";

// A interface de props que este componente visual espera receber
export interface PizzaFormProps {
  formData: { nome: string; descricao: string; preco: string };
  errors: { [key: string]: string | undefined };
  imagePreview: string | null;
  isLoading: boolean;
  apiError: string | null;
  isEditing: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageChange: (file: File | null) => void;
  onSubmit: (e: FormEvent) => void;
  onImageRemove: () => void;
  onCancel: () => void;
}

// Este componente é puramente visual. Ele não sabe como o estado funciona.
export const PizzaForm = ({
  formData,
  errors,
  imagePreview,
  isLoading,
  apiError,
  isEditing,
  onInputChange,
  onImageChange,
  onSubmit,
  onImageRemove,
  onCancel,
}: PizzaFormProps) => {
  return (
    <Box as="form" onSubmit={onSubmit} w="full" p={6}>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* Coluna 1: Preview (Poderia até ser um componente separado no futuro) */}
        <GridItem>{/* ... Seu JSX de preview aqui ... */}</GridItem>

        {/* Coluna 2: Formulário */}
        <GridItem>
          <VStack gap={6} align="stretch">
            <Heading size="lg" color="orange.400" textAlign="center">
              🛠️ Dados da Pizza
            </Heading>
            <VStack gap={4} align="stretch">
              <Field.Root invalid={!!errors.imagem}>
                <Field.Label>Imagem da Pizza *</Field.Label>
                <PizzaFileInput
                  onChange={onImageChange}
                  preview={imagePreview}
                  onRemove={onImageRemove}
                  accept="image/*"
                />
                <Field.ErrorText>{errors.imagem}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.nome}>
                <Field.Label>Nome da Pizza *</Field.Label>
                <PizzaInput
                  name="nome"
                  value={formData.nome}
                  onChange={onInputChange}
                />
                <Field.ErrorText>{errors.nome}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.descricao}>
                <Field.Label>Descrição *</Field.Label>
                <PizzaTextarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={onInputChange}
                  rows={4}
                />
                <Field.ErrorText>{errors.descricao}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.preco}>
                <Field.Label>Preço (R$) *</Field.Label>
                <PizzaInput
                  name="preco"
                  value={formData.preco}
                  onChange={onInputChange}
                />
                <Field.ErrorText>{errors.preco}</Field.ErrorText>
              </Field.Root>

              {apiError && (
                <Box p={3} bg="red.50" borderRadius="md">
                  <Text color="red.500">{apiError}</Text>
                </Box>
              )}
              <HStack w="full" gap={4} mt={6}>
                <Button type="submit" loading={isLoading} flex={1}>
                  {isEditing ? "Atualizar Pizza" : "Salvar Pizza"}
                </Button>
                <Button onClick={onCancel} variant="outline" flex={1}>
                  Cancelar
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
