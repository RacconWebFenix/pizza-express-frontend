"use client";

import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  useDisclosure,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { PizzaButton } from "@/components/ui";
import { useProdutos } from "../hooks/useProdutos";
import { ProdutoFormModal, ProdutoCard } from "./index";
import { Produto } from "@/types/produto";

export const ProdutosList: React.FC = () => {
  const { produtos, isLoading, error, remove } = useProdutos();
  const {
    open: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();
  const {
    open: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [produtoToDelete, setProdutoToDelete] = useState<Produto | null>(null);

  const handleEdit = (produto: Produto) => {
    setSelectedProduto(produto);
    onFormOpen();
  };

  const handleCreate = () => {
    setSelectedProduto(null);
    onFormOpen();
  };

  const handleDelete = (produto: Produto) => {
    setProdutoToDelete(produto);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    if (produtoToDelete) {
      try {
        await remove(produtoToDelete.id);
        onDeleteClose();
        setProdutoToDelete(null);
      } catch {
        // Error já tratado no hook
      }
    }
  };

  const handleFormClose = () => {
    setSelectedProduto(null);
    onFormClose();
  };

  if (isLoading) {
    return <Text>Carregando produtos...</Text>;
  }

  if (error) {
    return (
      <Box
        p={4}
        bg="red.50"
        borderRadius="md"
        border="1px solid"
        borderColor="red.200"
      >
        <Text color="red.600">{error}</Text>
      </Box>
    );
  }

  return (
    <VStack gap={6} align="stretch">
      {/* Header */}
      <HStack justify="space-between" align="center">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Produtos
          </Text>
          <Text color="gray.600">Gerencie os produtos do cardápio</Text>
        </Box>
        <PizzaButton colorScheme="orange" icon={FaPlus} onClick={handleCreate}>
          Novo Produto
        </PizzaButton>
      </HStack>

      {/* Lista de Produtos */}
      {produtos.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" mb={4}>
            Nenhum produto cadastrado ainda.
          </Text>
          <PizzaButton
            colorScheme="orange"
            icon={FaPlus}
            onClick={handleCreate}
          >
            Criar Primeiro Produto
          </PizzaButton>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {produtos.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </SimpleGrid>
      )}

      {/* Modal de Formulário */}
      <ProdutoFormModal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        produto={selectedProduto}
      />

      {/* Modal de Confirmação de Delete */}
      {isDeleteOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="modal"
          onClick={onDeleteClose}
        >
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            borderRadius="lg"
            maxW="md"
            w="full"
            mx={4}
            onClick={(e) => e.stopPropagation()}
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Deletar Produto
            </Text>
            <Text mb={4}>
              Tem certeza que deseja deletar o produto &quot;
              {produtoToDelete?.name}&quot;? Esta ação não pode ser desfeita.
            </Text>
            <HStack gap={3} justify="flex-end">
              <Button variant="outline" onClick={onDeleteClose}>
                Cancelar
              </Button>
              <PizzaButton colorScheme="red" onClick={handleDeleteConfirm}>
                Deletar
              </PizzaButton>
            </HStack>
          </Box>
        </Box>
      )}
    </VStack>
  );
};
