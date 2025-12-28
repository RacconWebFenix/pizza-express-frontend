"use client";

import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { parseProductPrice, formatProductPrice } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  isLoading?: boolean;
}

/**
 * Card para exibir produto no catálogo
 */
export const ProductCard = ({
  product,
  onAddToCart,
  isLoading = false,
}: ProductCardProps) => {
  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const price = parseProductPrice(product.price);

  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-2px)",
        borderColor: "orange.300",
      }}
    >
      {/* Imagem do produto */}
      <Box position="relative" h="200px" bg="gray.100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            w="full"
            h="full"
            objectFit="cover"
          />
        ) : (
          <Box
            w="full"
            h="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.200"
            color="gray.500"
          >
            Sem imagem
          </Box>
        )}

        {/* Badge de categoria */}
        <Badge
          position="absolute"
          top="2"
          right="2"
          bg="orange.500"
          color="white"
          fontSize="xs"
          px="2"
          py="1"
          borderRadius="md"
        >
          {product.category.name}
        </Badge>
      </Box>

      {/* Conteúdo */}
      <VStack p="4" align="stretch" gap="3">
        <VStack align="start" gap="1">
          <Text fontSize="lg" fontWeight="semibold" color="gray.800">
            {product.name}
          </Text>

          {product.description && (
            <Text fontSize="sm" color="gray.600" minH="2.5rem">
              {product.description}
            </Text>
          )}
        </VStack>

        {/* Preço e botão */}
        <HStack justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold" color="orange.600">
            R$ {formatProductPrice(price)}
          </Text>

          <Button
            size="sm"
            bg="orange.500"
            color="white"
            _hover={{ bg: "orange.600" }}
            onClick={handleAddToCart}
            loading={isLoading}
            loadingText="Adicionando..."
          >
            <HStack gap="1">
              <Plus size={16} />
              <Text>Adicionar</Text>
            </HStack>
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
