"use client";

import { Box, Input, VStack, HStack, Button } from "@chakra-ui/react";
import { useRef, ChangeEvent } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { PizzaText } from "./PizzaText";

import Image from "next/image";

interface PizzaFileInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  accept?: string;
  onChange: (file: File | null) => void;
  preview?: string | null;
  onPreviewClick?: () => void;
  onRemove?: () => void;
  placeholder?: string;
}

/**
 * Componente de upload de arquivo customizado para o Pizza Express
 * Segue o padrão visual do projeto e inclui preview de imagem
 */
export function PizzaFileInput({
  label,
  error,
  required,
  accept = "image/jpeg,image/jpg,image/png,image/webp",
  onChange,
  preview,
  onPreviewClick,
  onRemove,
  placeholder = "Clique para selecionar ou arraste uma imagem",
}: PizzaFileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChange(file || null);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange(null);
    onRemove?.();
  };

  return (
    <Box w="full">
      {label && (
        <PizzaText color="gray.800" mb={2} fontSize="sm" fontWeight="medium">
          {label}
          {required && (
            <PizzaText as="span" color="red.500" ml={1}>
              *
            </PizzaText>
          )}
        </PizzaText>
      )}

      <Input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        display="none"
      />

      {!preview ? (
        <Box
          border="2px dashed"
          borderColor={error ? "red.300" : "gray.300"}
          borderRadius="lg"
          p={8}
          textAlign="center"
          cursor="pointer"
          transition="all 0.2s ease-in-out"
          _hover={{
            borderColor: error ? "red.400" : "brand.primary",
            bg: "gray.50",
          }}
          onClick={handleClick}
          bg="white"
        >
          <VStack gap={4}>
            <Box
              w={12}
              h={12}
              borderRadius="full"
              bg="gray.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="gray.500"
            >
              <FaCloudUploadAlt size={24} />
            </Box>

            <VStack gap={1}>
              <PizzaText
                fontSize="md"
                fontWeight="medium"
                color="brand.primary"
              >
                {placeholder}
              </PizzaText>
              <PizzaText fontSize="sm" color="gray.500">
                Formatos aceitos: JPG, PNG, WEBP
              </PizzaText>
              <PizzaText fontSize="sm" color="gray.500">
                Tamanho máximo: 5MB
              </PizzaText>
            </VStack>
          </VStack>
        </Box>
      ) : (
        <Box
          border="2px solid"
          borderColor="gray.200"
          borderRadius="lg"
          p={4}
          bg="white"
        >
          <VStack gap={4}>
            <PizzaText fontSize="sm" fontWeight="medium" color="gray.700">
              Preview da imagem:
            </PizzaText>

            <Box
              position="relative"
              w="full"
              maxW="200px"
              h="150px"
              borderRadius="md"
              overflow="hidden"
              cursor="pointer"
              border="1px solid"
              borderColor="gray.200"
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
              onClick={onPreviewClick}
            >
              <Image
                src={preview}
                alt="Preview da pizza"
                fill
                sizes="200px"
                className="object-cover"
              />
            </Box>

            <HStack gap={3}>
              <Button
                colorPalette="orange"
                variant="solid"
                onClick={handleClick}
              >
                Alterar
              </Button>

              <Button
                colorPalette="red"
                variant="solid"
                size="sm"
                onClick={handleRemove}
              >
                <HStack gap={1}>
                  <FaTrash size={12} />
                  <span>Remover</span>
                </HStack>
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}

      {error && (
        <PizzaText color="red.500" fontSize="sm" mt={2}>
          {error}
        </PizzaText>
      )}
    </Box>
  );
}
