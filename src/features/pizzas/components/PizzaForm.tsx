// src/components/PizzaForm/PizzaForm.tsx
"use client";

import { PizzaFileInput, PizzaInput, PizzaTextarea } from "@/components/ui";
import { PizzaFormInputData } from "@/utils/validation";

import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Grid,
  GridItem,
  BoxProps,
  TextProps,
} from "@chakra-ui/react";
import { FormEvent, ReactNode } from "react";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
} from "react-hook-form";

// Interfaces para componentes Field tipados
interface FieldRootProps extends BoxProps {
  children: ReactNode;
}

interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

interface FieldErrorTextProps extends TextProps {
  children?: ReactNode;
}

// Componentes customizados para Field com tipagem adequada
const Field = {
  Root: ({ children, ...props }: FieldRootProps) => (
    <Box {...props}>{children}</Box>
  ),
  Label: ({ children, ...props }: FieldLabelProps) => (
    <label {...props}>{children}</label>
  ),
  ErrorText: ({ children, ...props }: FieldErrorTextProps) => (
    <Box as="p" color="red.500" fontSize="sm" {...props}>
      {children}
    </Box>
  ),
};

export interface PizzaFormProps {
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
  errors: FieldErrors<PizzaFormInputData>;
  register: UseFormRegister<PizzaFormInputData>;
  control: Control<PizzaFormInputData>;
}

export const PizzaForm = ({
  onSubmit,
  onCancel,
  isSubmitting,
  isEditing,
  errors,
  register,
  control,
}: PizzaFormProps) => {
  return (
    <Box as="form" onSubmit={onSubmit} w="full">
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        <GridItem>{/* Preview opcional */}</GridItem>

        <GridItem>
          <VStack gap={4} align="stretch">
            <Heading size="lg" color="orange.400" textAlign="center">
              🛠️ Dados da Pizza
            </Heading>

            <Field.Root>
              <Field.Label>Nome da Pizza *</Field.Label>
              <PizzaInput {...register("nome")} />
              <Field.ErrorText>{errors.nome?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <Field.Label>Descrição *</Field.Label>
              <PizzaTextarea {...register("descricao")} rows={4} />
              <Field.ErrorText>{errors.descricao?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <Field.Label>Preço (R$) *</Field.Label>
              {/* O RHF lida com a conversão de `number` para a `string` que o input espera */}
              <PizzaInput type="number" step="0.01" {...register("preco")} />
              <Field.ErrorText>{errors.preco?.message}</Field.ErrorText>
            </Field.Root>

            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, ...field }, fieldState }) => (
                <Field.Root>
                  <Field.Label>Imagem da Pizza</Field.Label>
                  <PizzaFileInput
                    onChange={(file) => onChange(file ? [file] : null)}
                    {...field}
                  />
                  <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
                </Field.Root>
              )}
            />

            <HStack w="full" gap={4} mt={6}>
              <Button type="submit" loading={isSubmitting} flex={1}>
                {isEditing ? "Atualizar Pizza" : "Salvar Pizza"}
              </Button>
              <Button onClick={onCancel} variant="outline" flex={1}>
                Cancelar
              </Button>
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
