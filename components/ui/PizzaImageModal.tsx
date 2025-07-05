"use client";

import { Box, HStack, Portal, VStack } from "@chakra-ui/react";
import { PizzaButton, PizzaText, PizzaBadge } from "@/components/ui";
import Image from "next/image";
import { FaTimes, FaPizzaSlice, FaHeart } from "react-icons/fa";
import { useEffect } from "react";

interface PizzaImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageName?: string;
}

/**
 * Modal temático para exibir imagem de pizza em tamanho maior
 * Design inspirado na temática de pizzaria italiana
 */
export function PizzaImageModal({
  isOpen,
  onClose,
  imageUrl,
  imageName = "Imagem da Pizza",
}: PizzaImageModalProps) {
  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fechar modal ao pressionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <Portal>
      {/* Backdrop */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.700"
        zIndex={1000}
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={onClose}
        css={{
          animation: "fadeIn 0.2s ease-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      >
        {/* Modal Content */}
        <Box
          mx={4}
          bg="white"
          borderRadius="2xl"
          overflow="hidden"
          maxW="700px"
          w="full"
          maxH="90vh"
          boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          border="3px solid"
          borderColor="orange.300"
          onClick={(e) => e.stopPropagation()}
          css={{
            animation: "slideIn 0.3s ease-out",
            "@keyframes slideIn": {
              "0%": {
                opacity: 0,
                transform: "scale(0.9) translateY(-20px)",
              },
              "100%": {
                opacity: 1,
                transform: "scale(1) translateY(0)",
              },
            },
          }}
        >
          {/* Header do Modal */}
          <Box
            bg="linear-gradient(135deg, orange.400, red.400)"
            p={4}
            color="white"
            position="relative"
          >
            <HStack justify="space-between" align="center" gap={3}>
              <HStack gap={3}>
                <Box
                  p={2}
                  bg="whiteAlpha.200"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FaPizzaSlice size={20} />
                </Box>
                <VStack gap={0} align="start">
                  <PizzaText
                    variant="heading"
                    color="white"
                    fontWeight="bold"
                    fontSize="lg"
                    mb={0}
                  >
                    Preview da Pizza
                  </PizzaText>
                  <PizzaText
                    variant="body"
                    color="whiteAlpha.800"
                    fontSize="sm"
                    mb={0}
                  >
                    {imageName}
                  </PizzaText>
                </VStack>
              </HStack>

              <Box
                color="white"
                _hover={{
                  bg: "whiteAlpha.200",
                  transform: "scale(1.1)",
                }}
                borderRadius="full"
                p={2}
                cursor="pointer"
                onClick={onClose}
                transition="all 0.2s"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FaTimes size={18} />
              </Box>
            </HStack>
          </Box>

          {/* Corpo do Modal */}
          <Box bg="gray.50">
            {/* Container da Imagem */}
            <Box
              position="relative"
              w="full"
              aspectRatio="4/3"
              bg="white"
              m={4}
              borderRadius="xl"
              overflow="hidden"
              boxShadow="lg"
              border="2px solid"
              borderColor="orange.200"
            >
              <Image
                src={imageUrl}
                alt={imageName}
                fill
                sizes="700px"
                style={{ objectFit: "cover" }}
                priority
              />

              {/* Badge decorativo */}
              <Box
                position="absolute"
                top={3}
                right={3}
                bg="red.500"
                color="white"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="bold"
                display="flex"
                alignItems="center"
                gap={1}
                boxShadow="md"
              >
                <FaHeart size={12} />
                Deliciosa
              </Box>
            </Box>

            {/* Footer do Modal */}
            <Box p={4}>
              <VStack gap={4}>
                <HStack gap={3} w="full" justify="center">
                  <PizzaBadge variant="info" fontSize="sm" px={3} py={1}>
                    🍕 Pizza Express
                  </PizzaBadge>
                  <PizzaBadge variant="success" fontSize="sm" px={3} py={1}>
                    ✨ Qualidade Premium
                  </PizzaBadge>
                </HStack>

                {/* Botão de ação */}
                <PizzaButton
                  variant="pizza"
                  size="lg"
                  onClick={onClose}
                  w="full"
                  borderRadius="xl"
                  h={12}
                  fontWeight="bold"
                  fontSize="md"
                  _hover={{
                    transform: "translateY(-1px)",
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s"
                >
                  Fechar Preview
                </PizzaButton>
              </VStack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Portal>
  );
}
