"use client";

import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  AspectRatio,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/format";
import { IMAGE_CONFIG } from "../../utils/image-config";
import { PizzaInput, PizzaTextarea, PizzaFileInput, PizzaText } from "../ui";

const MotionBox = motion(Box);

interface PizzaFormCardProps {
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
  onSubmit: (e: React.FormEvent) => void;
  onImageRemove: () => void;
  onCancel: () => void;
}

export const PizzaFormCard = ({
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
}: PizzaFormCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Preço formatado para preview
  const precoNumerico = parseFloat(formData.preco.replace(",", "."));
  const precoFormatado = isNaN(precoNumerico)
    ? "R$ 0,00"
    : formatCurrency(precoNumerico);

  // URL da imagem com fallback
  const getImageUrl = () => {
    if (imagePreview && !imageError) {
      return imagePreview;
    }
    return IMAGE_CONFIG.DEFAULT_PIZZA_IMAGE;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Reset image error when preview changes
  useEffect(() => {
    if (imagePreview) {
      setImageError(false);
    }
  }, [imagePreview]);

  return (
    <Box as="form" onSubmit={onSubmit} w="full" p={6}>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* Coluna 1: Preview da Pizza */}
        <GridItem>
          <VStack gap={6} align="stretch">
            <Heading size="lg" color="orange.400" textAlign="center">
              📋 {isEditing ? "Editar Pizza" : "Nova Pizza"}
            </Heading>

            {/* Card Preview no estilo do cardápio */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Box
                bg="white"
                _dark={{
                  bg: "gray.800",
                  color: "white",
                  borderColor: "gray.600",
                }}
                color="black"
                borderRadius="xl"
                boxShadow="xl"
                overflow="hidden"
                border="1px"
                borderColor="gray.200"
                transition="all 0.3s"
                _hover={{
                  borderColor: "brand.primary",
                  boxShadow: "2xl",
                }}
              >
                {/* Imagem da Pizza */}
                <AspectRatio ratio={4 / 3}>
                  <Box position="relative" w="full" h="full">
                    <Image
                      src={getImageUrl()}
                      alt={formData.nome || "Nova Pizza"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{
                        objectFit: "cover",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                      onError={handleImageError}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />

                    {/* Preview - Overlay com preço */}
                    <Box
                      position="absolute"
                      top={3}
                      right={3}
                      bg="brand.primary"
                      color="white"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="lg"
                      fontWeight="bold"
                      boxShadow="md"
                    >
                      {precoFormatado}
                    </Box>

                    {/* Badge de Preview */}
                    <Box
                      position="absolute"
                      top={3}
                      left={3}
                      bg="brand.accent"
                      color="brand.textPrimary"
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="xs"
                      fontWeight="bold"
                    >
                      👁️ PREVIEW
                    </Box>
                  </Box>
                </AspectRatio>

                {/* Header da Pizza */}
                <Box
                  bg="gray.100"
                  _dark={{ bg: "gray.700", borderColor: "gray.600" }}
                  p={4}
                  borderBottom="1px"
                  borderColor="gray.200"
                >
                  <Heading
                    size="lg"
                    color="brand.textPrimary"
                    _dark={{ color: "white" }}
                    textAlign="center"
                  >
                    {formData.nome || "Nome da Pizza"}
                  </Heading>
                </Box>

                {/* Conteúdo */}
                <VStack p={6} gap={4} align="stretch">
                  <Text
                    color="gray.600"
                    _dark={{ color: "gray.300" }}
                    fontSize="md"
                    textAlign="center"
                    minH="60px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    lineHeight="1.5"
                  >
                    {formData.descricao ||
                      "Descrição da pizza aparecerá aqui..."}
                  </Text>

                  <Button
                    colorScheme="red"
                    variant="solid"
                    size="lg"
                    w="full"
                    _hover={{ bg: "brand.primary" }}
                    transition="all 0.2s"
                    disabled
                    opacity={0.7}
                  >
                    🍕 Preview do Card
                  </Button>
                </VStack>
              </Box>
            </MotionBox>
          </VStack>
        </GridItem>

        {/* Coluna 2: Formulário */}
        <GridItem>
          <VStack gap={6} align="stretch">
            <Heading size="lg" color="orange.400" textAlign="center">
              🛠️ Dados da Pizza
            </Heading>

            <VStack gap={4} align="stretch">
              {/* Upload de Imagem */}
              <Box
                p={4}
                bg="white"
                _dark={{ bg: "gray.800" }}
                borderRadius="lg"
                border="2px dashed"
                borderColor="brand.accent"
                boxShadow="sm"
              >
                <PizzaFileInput
                  label="Imagem da Pizza *"
                  error={errors.imagem}
                  onChange={onImageChange}
                  preview={imagePreview}
                  onRemove={onImageRemove}
                  accept="image/*"
                />
                <Text fontSize="xs" color="gray.500" mt={2} textAlign="center">
                  A imagem aparecerá no preview ao lado instantaneamente
                </Text>
              </Box>

              {/* Nome */}
              <PizzaInput
                label="Nome da Pizza *"
                name="nome"
                value={formData.nome}
                onChange={onInputChange}
                error={errors.nome}
                placeholder="Ex: Pizza Margherita"
              />

              {/* Descrição */}
              <PizzaTextarea
                label="Descrição *"
                name="descricao"
                value={formData.descricao}
                onChange={onInputChange}
                error={errors.descricao}
                placeholder="Descreva os ingredientes e características da pizza..."
                rows={4}
              />

              {/* Preço */}
              <PizzaInput
                label="Preço (R$) *"
                name="preco"
                value={formData.preco}
                onChange={onInputChange}
                error={errors.preco}
                placeholder="Ex: 49,90"
                type="text"
              />

              {/* Erro da API */}
              {apiError && (
                <Box
                  p={3}
                  bg="red.50"
                  _dark={{ bg: "red.900" }}
                  borderRadius="md"
                  borderLeft="4px"
                  borderColor="red.500"
                >
                  <PizzaText variant="danger" fontSize="sm">
                    ❌ {apiError}
                  </PizzaText>
                </Box>
              )}

              {/* Botões de Ação */}
              <HStack w="full" gap={4} mt={6}>
                <Button
                  colorScheme="orange"
                  size="lg"
                  loading={isLoading}
                  disabled={isLoading}
                  type="submit"
                  flex={1}
                >
                  💾 {isEditing ? "Atualizar Pizza" : "Salvar Pizza"}
                </Button>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size="lg"
                  onClick={onCancel}
                  flex={1}
                >
                  ❌ Cancelar
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
