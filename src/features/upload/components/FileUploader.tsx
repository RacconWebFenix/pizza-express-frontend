"use client";

import React, { useRef, useState } from "react";
import { Box, VStack, Text, Icon } from "@chakra-ui/react";
import { FaCloudUploadAlt, FaTrash, FaFile, FaImage } from "react-icons/fa";
import { PizzaButton } from "@/components/ui";
import { useFileUpload } from "../hooks/useFileUpload";
import { UploadOptions, UploadResult } from "@/types/upload";
import Image from "next/image";

interface FileUploaderProps {
  onUploadComplete?: (result: UploadResult) => void;
  onError?: (error: string) => void;
  uploadOptions?: UploadOptions;
  pizzaId?: string; // Para upload específico de pizza
  accept?: string;
  maxSizeText?: string;
  currentImageUrl?: string; // Para mostrar imagem atual
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onUploadComplete,
  onError,
  uploadOptions,
  pizzaId,
  accept = "image/*",
  maxSizeText = "Máx: 5MB",
  currentImageUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );

  const { upload, isUploading, progress, error, reset } =
    useFileUpload(uploadOptions);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    // Criar preview para imagens
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const result = await upload(selectedFile, pizzaId);
      onUploadComplete?.(result);
      setSelectedFile(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro no upload";
      onError?.(errorMessage);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(currentImageUrl || null);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    if (previewUrl && selectedFile?.type.startsWith("image/")) {
      return <FaImage />;
    }
    return <FaFile />;
  };

  return (
    <VStack gap={4} align="stretch">
      {/* Área de drop/upload */}
      <Box
        border="2px dashed"
        borderColor={selectedFile ? "orange.300" : "gray.300"}
        borderRadius="md"
        p={6}
        textAlign="center"
        bg={selectedFile ? "orange.50" : "gray.50"}
        cursor="pointer"
        onClick={() => fileInputRef.current?.click()}
        transition="all 0.2s"
        _hover={{ borderColor: "orange.400", bg: "orange.25" }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />

        {previewUrl ? (
          <Box>
            <Image
              src={previewUrl}
              alt="Preview"
              width={200}
              height={200}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            />
            <Text fontSize="sm" color="gray.600">
              Clique para alterar
            </Text>
          </Box>
        ) : (
          <VStack gap={2}>
            <Icon as={FaCloudUploadAlt} boxSize="24px" color="gray.500" />
            <Text fontWeight="medium">
              Arraste uma imagem ou clique para selecionar
            </Text>
            <Text fontSize="sm" color="gray.500">
              {accept} • {maxSizeText}
            </Text>
          </VStack>
        )}
      </Box>

      {/* Arquivo selecionado */}
      {selectedFile && (
        <Box
          p={3}
          bg="blue.50"
          borderRadius="md"
          border="1px solid"
          borderColor="blue.200"
        >
          <VStack gap={2} align="stretch">
            <Box display="flex" alignItems="center" gap={2}>
              <Icon as={getFileIcon} color="blue.500" />
              <Text fontSize="sm" fontWeight="medium" flex={1}>
                {selectedFile.name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </Text>
            </Box>

            {/* Progress bar */}
            {isUploading && progress && (
              <Box
                w="100%"
                h="4px"
                bg="gray.200"
                borderRadius="md"
                overflow="hidden"
              >
                <Box
                  h="100%"
                  bg="orange.500"
                  width={`${progress.percentage}%`}
                  transition="width 0.3s"
                />
              </Box>
            )}

            {/* Ações */}
            <Box display="flex" gap={2} justifyContent="flex-end">
              <PizzaButton
                size="sm"
                variant="outline"
                onClick={handleRemove}
                disabled={isUploading}
              >
                <FaTrash />
              </PizzaButton>
              <PizzaButton
                size="sm"
                colorScheme="orange"
                onClick={handleUpload}
                loading={isUploading}
                loadingText="Enviando..."
              >
                Enviar
              </PizzaButton>
            </Box>
          </VStack>
        </Box>
      )}

      {/* Erro */}
      {error && (
        <Text color="red.500" fontSize="sm" textAlign="center">
          {error}
        </Text>
      )}
    </VStack>
  );
};
