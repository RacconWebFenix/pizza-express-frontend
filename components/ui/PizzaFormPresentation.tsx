"use client";

import { VStack, HStack, Box } from "@chakra-ui/react";
import {
  PizzaInput,
  PizzaTextarea,
  PizzaButton,
  PizzaFileInput,
  PizzaText,
  PizzaImageModal,
} from ".";

interface PizzaFormPresentationProps {
  formData: { nome: string; descricao: string; preco: string };
  errors: { [key: string]: string | undefined };
  imagePreview: string | null;
  isLoading: boolean;
  apiError: string | null;
  isImageModalOpen: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  onImageModalOpen: () => void;
  onImageModalClose: () => void;
  onImageRemove: () => void;
  onCancel: () => void;
}

export const PizzaFormPresentation = ({
  formData,
  errors,
  imagePreview,
  isLoading,
  apiError,
  isImageModalOpen,
  onInputChange,
  onImageChange,
  onSubmit,
  onImageModalOpen,
  onImageModalClose,
  onImageRemove,
  onCancel,
}: PizzaFormPresentationProps) => (
  <>
    <Box as="form" onSubmit={onSubmit} w="full">
      <VStack spaceX={5} spaceY={5} align="stretch">
        <PizzaFileInput
          label="Imagem da Pizza *"
          error={errors.imagem}
          onChange={onImageChange}
          preview={imagePreview}
          onPreviewClick={onImageModalOpen}
          onRemove={onImageRemove}
        />
        <PizzaInput
          label="Nome da Pizza"
          name="nome"
          value={formData.nome}
          onChange={onInputChange}
          error={errors.nome}
          placeholder="Ex: Pizza Margherita"
        />
        <PizzaTextarea
          label="Descrição"
          name="descricao"
          value={formData.descricao}
          onChange={onInputChange}
          error={errors.descricao}
          placeholder="Descreva os ingredientes..."
          rows={4}
        />
        <PizzaInput
          label="Preço (R$)"
          name="preco"
          value={formData.preco}
          onChange={onInputChange}
          error={errors.preco}
          placeholder="Ex: 49,90"
        />
        {apiError && (
          <PizzaText variant="danger" fontSize="sm">
            {apiError}
          </PizzaText>
        )}
        <HStack w="full" spaceX={4} spaceY={4}>
          <PizzaButton
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            flex={1}
          >
            Cancelar
          </PizzaButton>
          <PizzaButton
            type="submit"
            variant="primary"
            loading={isLoading}
            flex={1}
          >
            Salvar Pizza
          </PizzaButton>
        </HStack>
      </VStack>
    </Box>
    <PizzaImageModal
      isOpen={isImageModalOpen}
      onClose={onImageModalClose}
      imageUrl={imagePreview || ""}
      imageName={formData.nome || "Preview da Pizza"}
    />
  </>
);
