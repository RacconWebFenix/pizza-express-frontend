"use client";

import { VStack, HStack, Button, Heading, Box } from "@chakra-ui/react";
import { FormPresenterProps } from "@/forms/core";
import { PizzaFormInputData, PizzaFormOutputData } from "@/utils/validation";
import { PizzaCard } from "@/features/pizzas/components/PizzaCard"; // Correct import for PizzaCard with pizza prop
import { Pizza } from "@/types/pizzas";

// Import fields from individual files
import { PizzaTextField } from "@/forms/fields/PizzaTextField";
import { PizzaTextAreaField } from "@/forms/fields/PizzaTextAreaField";
import { PizzaMoneyField } from "@/forms/fields/PizzaMoneyField";
import { PizzaFileField } from "@/forms/fields/PizzaFileField";

interface PizzaFormPresentationProps extends FormPresenterProps<PizzaFormInputData, unknown, PizzaFormOutputData> {
  onCancel: () => void;
  previewPizza: Pizza;
  isEditing?: boolean;
}

export const PizzaFormPresentation = ({
  form: { control, handleSubmit },
  onSubmit,
  isSubmitting,
  apiError,
  onCancel,
  previewPizza,
  isEditing,
}: PizzaFormPresentationProps) => {
  return (
    <Box w="full" as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={6} align="stretch">

        {/* Preview Section */}
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
                pizza={previewPizza}
                onAddToCart={() => { }}
              />
            </Box>
          </Box>
        </Box>

        {/* Form Fields Section */}
        <Box>
          <Heading size="lg" color="orange.400" textAlign="center" mb={4}>
            🛠️ Dados da Pizza
          </Heading>

          <VStack gap={4} align="stretch">
            <PizzaTextField<PizzaFormInputData>
              name="nome"
              control={control}
              label="Nome da Pizza *"
              placeholder="Ex: Pizza Margherita"
              required
            />

            <PizzaTextAreaField<PizzaFormInputData>
              name="descricao"
              control={control}
              label="Descrição *"
              placeholder="Descreva os ingredientes..."
              required
              rows={4}
            />

            <PizzaMoneyField<PizzaFormInputData>
              name="preco"
              control={control}
              label="Preço (R$) *"
              placeholder="Ex: 49.90"
              required
            />

            <PizzaFileField<PizzaFormInputData>
              name="image"
              control={control}
              label="Imagem da Pizza"
              placeholder="Clique para selecionar ou arraste"
            />

            {apiError && (
              <Box color="red.500" fontSize="sm" mt={2}>
                {apiError}
              </Box>
            )}

            <HStack w="full" gap={4} mt={6}>
              <Button
                type="submit"
                loading={isSubmitting}
                flex={1}
                colorPalette="orange"
                variant="solid"
                disabled={isSubmitting}
              >
                {isEditing ? "Atualizar Pizza" : "Salvar Pizza"}
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                flex={1}
                colorPalette="gray"
              >
                Cancelar
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};
