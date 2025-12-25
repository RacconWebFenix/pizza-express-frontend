"use client";

import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { PizzaCard } from "@/components/ui";
import { Produto } from "@/types/produto";

interface ProdutoCardProps {
  produto: Produto;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

/**
 * Componente responsável por renderizar um card de produto.
 * Segue o princípio da Responsabilidade Única (SRP) ao focar apenas na apresentação.
 */
export const ProdutoCard: React.FC<ProdutoCardProps> = ({
  produto,
  onEdit,
  onDelete,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <PizzaCard>
      <VStack align="stretch" gap={3}>
        {/* Imagem */}
        <Box position="relative">
          {produto.image ? (
            <Image
              src={produto.image}
              alt={produto.name}
              borderRadius="md"
              w="full"
              h="150px"
              objectFit="cover"
            />
          ) : (
            <Box
              w="full"
              h="150px"
              bg="gray.100"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FaImage size={32} color="#A0AEC0" />
            </Box>
          )}
        </Box>

        {/* Conteúdo */}
        <Box>
          <HStack justify="space-between" align="start">
            <Box flex={1}>
              <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                {produto.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {produto.description}
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="orange.500" mt={1}>
                {formatPrice(produto.price)}
              </Text>
            </Box>
            <HStack gap={1}>
              <IconButton
                size="sm"
                variant="ghost"
                colorScheme="blue"
                aria-label="Editar produto"
                onClick={() => onEdit(produto)}
              >
                <FaEdit />
              </IconButton>
              <IconButton
                size="sm"
                variant="ghost"
                colorScheme="red"
                aria-label="Deletar produto"
                onClick={() => onDelete(produto)}
              >
                <FaTrash />
              </IconButton>
            </HStack>
          </HStack>

          {/* Categoria e Status */}
          <HStack justify="space-between" align="center" mt={3}>
            <Badge colorScheme="blue" variant="subtle" fontSize="xs">
              {produto.category?.name || "Sem categoria"}
            </Badge>
            <Badge
              colorScheme={produto.active ? "green" : "red"}
              variant="subtle"
              fontSize="xs"
            >
              {produto.active ? "Ativo" : "Inativo"}
            </Badge>
          </HStack>
        </Box>

        {/* Data de criação */}
        <Box pt={2} borderTop="1px solid" borderColor="gray.100">
          <Text fontSize="xs" color="gray.400">
            Criado em: {new Date(produto.createdAt).toLocaleDateString("pt-BR")}
          </Text>
        </Box>
      </VStack>
    </PizzaCard>
  );
};
