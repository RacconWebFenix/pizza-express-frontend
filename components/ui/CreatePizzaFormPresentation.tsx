"use client";

import { VStack, HStack, Box } from "@chakra-ui/react";
import {
  PizzaCard,
  PizzaText,
  PizzaInput,
  PizzaTextarea,
  PizzaFileInput,
  PizzaButton,
  PizzaLoading,
  PizzaImageModal,
} from "@/components/ui";

interface CreatePizzaFormPresentationProps {
  // Form data
  formData: {
    nome: string;
    descricao: string;
    preco: string;
  };
  errors: {
    nome: string;
    descricao: string;
    preco: string;
    imagem: string;
  };
  selectedImage: File | null;
  imagePreview: string | null;
  isModalOpen: boolean;

  // States
  isLoading: boolean;
  error: string | null;

  // Event handlers
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  onModalOpen: () => void;
  onModalClose: () => void;
  onImageRemove: () => void;
  onCancel?: () => void;
}

/**
 * Componente de apresentação puro para o formulário de criação de pizza
 * Segue princípios de Clean Code - apenas responsável pela UI
 */
export const CreatePizzaFormPresentation: React.FC<
  CreatePizzaFormPresentationProps
> = ({
  formData,
  errors,
  imagePreview,
  isModalOpen,
  isLoading,
  error,
  onInputChange,
  onImageChange,
  onSubmit,
  onModalOpen,
  onModalClose,
  onImageRemove,
  onCancel,
}) => {
  if (isLoading) {
    return (
      <PizzaLoading isVisible={true} message="Criando pizza..." size="lg" />
    );
  }

  return (
    <>
      <PizzaCard variant="default" maxW="2xl" mx="auto">
        <VStack gap={6} p={6}>
          {/* Cabeçalho */}
          <VStack gap={2} textAlign="center">
            <PizzaText variant="heading" fontSize="2xl" color="brand.primary">
              🍕 Criar Nova Pizza
            </PizzaText>
            <PizzaText variant="body" color="gray.600">
              Preencha os dados da pizza e adicione uma imagem
            </PizzaText>
          </VStack>

          {/* Erro geral */}
          {error && (
            <Box
              w="full"
              p={4}
              bg="red.50"
              border="1px solid"
              borderColor="red.200"
              borderRadius="md"
            >
              <PizzaText color="red.700" fontSize="sm">
                {error}
              </PizzaText>
            </Box>
          )}

          {/* Formulário */}
          <Box as="form" onSubmit={onSubmit} w="full">
            <VStack gap={5}>
              {/* Campo Nome */}
              <PizzaInput
                label="Nome da Pizza"
                name="nome"
                value={formData.nome}
                onChange={onInputChange}
                error={errors.nome}
                placeholder="Ex: Pizza Margherita"
                required
                size="md"
                width="full"
              />

              {/* Campo Descrição */}
              <PizzaTextarea
                label="Descrição"
                name="descricao"
                value={formData.descricao}
                onChange={onInputChange}
                error={errors.descricao}
                placeholder="Descreva os ingredientes e características da pizza..."
                required
                rows={4}
                width="full"
                size="md"
              />

              {/* Campo Preço */}
              <PizzaInput
                label="Preço (R$)"
                name="preco"
                value={formData.preco}
                onChange={onInputChange}
                error={errors.preco}
                placeholder="25,90"
                required
                size="md"
                width="full"
              />

              {/* Campo Imagem */}
              <PizzaFileInput
                label="Imagem da Pizza"
                error={errors.imagem}
                onChange={onImageChange}
                preview={imagePreview}
                onPreviewClick={onModalOpen}
                onRemove={onImageRemove}
                required
              />

              {/* Botões */}
              <HStack w="full" gap={4} pt={4}>
                <PizzaButton
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={isLoading}
                  flex={1}
                >
                  Criar Pizza
                </PizzaButton>

                {onCancel && (
                  <PizzaButton
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={onCancel}
                    disabled={isLoading}
                    flex={1}
                  >
                    Cancelar
                  </PizzaButton>
                )}
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </PizzaCard>

      {/* Modal para exibir imagem */}
      <PizzaImageModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        imageUrl={imagePreview || ""}
        imageName={formData.nome || "Preview da Pizza"}
      />
    </>
  );
};
