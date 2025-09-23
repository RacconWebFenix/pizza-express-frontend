import { PizzaInput, PizzaTextarea, PizzaFileInput } from "@/components/ui";
import { PizzaFormInputData } from "@/utils/validation";
import { PizzaCard } from "./PizzaCard";
import { Pizza } from "@/types/pizzas";

import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  BoxProps,
  TextProps,
  Text,
} from "@chakra-ui/react";
import { FormEvent, ReactNode, useMemo } from "react";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
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
  watch: UseFormWatch<PizzaFormInputData>;
  pizzaToEdit?: Pizza | null;
}

export const PizzaForm = ({
  onSubmit,
  onCancel,
  isSubmitting,
  isEditing,
  errors,
  register,
  control,
  watch,
  pizzaToEdit,
}: PizzaFormProps) => {
  // Observar os valores do formulário para o preview
  const watchedValues = watch();

  // Criar um objeto pizza mockado para o preview
  const previewPizza = useMemo(() => {
    const preco = parseFloat(String(watchedValues.preco || "0"));
    const hasNewImage = watchedValues.image?.[0];
    const existingImage = pizzaToEdit?.image;

    return {
      id: 0, // ID mockado
      nome: watchedValues.nome || "Nome da Pizza",
      descricao:
        watchedValues.descricao || "Descrição da pizza aparecerá aqui...",
      preco: isNaN(preco) ? 0 : preco,
      image: hasNewImage
        ? URL.createObjectURL(watchedValues.image[0])
        : existingImage || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }, [watchedValues, pizzaToEdit]);

  return (
    <Box as="form" onSubmit={onSubmit} w="full">
      <VStack gap={6} align="stretch">
        {/* Preview sempre visível */}
        <Box>
          <Heading size="lg" color="orange.400" textAlign="center" mb={4}>
            📱 Preview do Cardápio
          </Heading>
          <Box
            display="flex"
            justifyContent="center"
            minH={{ base: "300px", lg: "400px" }}
            p={4}
          >
            <Box w="full" maxW="400px">
              <PizzaCard
                pizza={previewPizza as Pizza}
                onAddToCart={() => {}} // Função vazia para preview
              />
            </Box>
          </Box>
          <Text fontSize="sm" color="gray.500" textAlign="center" mb={6}>
            Este é como a pizza aparecerá no cardápio
          </Text>
        </Box>

        {/* Formulário */}
        <Box>
          <Heading size="lg" color="orange.400" textAlign="center" mb={4}>
            🛠️ Dados da Pizza
          </Heading>
          <VStack gap={4} align="stretch">
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
        </Box>
      </VStack>
    </Box>
  );
};
