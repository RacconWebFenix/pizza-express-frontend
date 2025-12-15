"use client";

import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  useDisclosure,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PizzaCard, PizzaButton } from "@/components/ui";
import { useCategorias } from "../hooks/useCategorias";
import { CategoriaFormModal } from "./CategoriaFormModal";
import { Categoria } from "@/types/categoria";

export const CategoriasList: React.FC = () => {
  const { categorias, isLoading, error, remove } = useCategorias();
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
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(
    null
  );
  const [categoriaToDelete, setCategoriaToDelete] = useState<Categoria | null>(
    null
  );

  const handleEdit = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    onFormOpen();
  };

  const handleCreate = () => {
    setSelectedCategoria(null);
    onFormOpen();
  };

  const handleDeleteClick = (categoria: Categoria) => {
    setCategoriaToDelete(categoria);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    if (categoriaToDelete) {
      try {
        await remove(categoriaToDelete.id);
        onDeleteClose();
        setCategoriaToDelete(null);
      } catch {
        // Error já tratado no hook
      }
    }
  };

  const handleFormClose = () => {
    setSelectedCategoria(null);
    onFormClose();
  };

  if (isLoading) {
    return <Text>Carregando categorias...</Text>;
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
            Categorias
          </Text>
          <Text color="gray.600">Gerencie as categorias dos produtos</Text>
        </Box>
        <PizzaButton colorScheme="orange" onClick={handleCreate}>
          Nova Categoria
        </PizzaButton>
      </HStack>

      {/* Lista de Categorias */}
      {categorias.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" mb={4}>
            Nenhuma categoria cadastrada ainda.
          </Text>
          <PizzaButton colorScheme="orange" onClick={handleCreate}>
            Criar Primeira Categoria
          </PizzaButton>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {categorias.map((categoria) => (
            <PizzaCard key={categoria.id}>
              <VStack align="stretch" gap={3}>
                <Box>
                  <HStack justify="space-between" align="start">
                    <Box flex={1}>
                      <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        color="gray.800"
                      >
                        {categoria.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Slug: {categoria.slug}
                      </Text>
                    </Box>
                    <HStack gap={1}>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        aria-label="Editar categoria"
                        onClick={() => handleEdit(categoria)}
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Deletar categoria"
                        onClick={() => handleDeleteClick(categoria)}
                      >
                        <FaTrash />
                      </IconButton>
                    </HStack>
                  </HStack>
                </Box>

                <Box pt={2} borderTop="1px solid" borderColor="gray.100">
                  <Text fontSize="xs" color="gray.400">
                    Criado em:{" "}
                    {new Date(categoria.createdAt).toLocaleDateString("pt-BR")}
                  </Text>
                  {categoria.updatedAt !== categoria.createdAt && (
                    <Text fontSize="xs" color="gray.400">
                      Atualizado:{" "}
                      {new Date(categoria.updatedAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </Text>
                  )}
                </Box>
              </VStack>
            </PizzaCard>
          ))}
        </SimpleGrid>
      )}

      {/* Modal de Formulário */}
      <CategoriaFormModal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        categoria={selectedCategoria}
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
              Deletar Categoria
            </Text>
            <Text mb={4}>
              Tem certeza que deseja deletar a categoria &quot;
              {categoriaToDelete?.name}&quot;? Esta ação não pode ser desfeita.
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
