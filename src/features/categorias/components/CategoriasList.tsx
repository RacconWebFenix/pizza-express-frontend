"use client";

import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  useDisclosure,
  AlertDialog,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { PizzaCard, PizzaButton } from '@/components/ui';
import { useCategorias } from '../hooks/useCategorias';
import { CategoriaFormModal } from './CategoriaFormModal';
import { Categoria } from '@/types/categoria';

export const CategoriasList: React.FC = () => {
  const { categorias, isLoading, error, remove } = useCategorias();
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [categoriaToDelete, setCategoriaToDelete] = useState<Categoria | null>(null);

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
      } catch (error) {
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
      <Box p={4} bg="red.50" borderRadius="md" border="1px solid" borderColor="red.200">
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
          <Text color="gray.600">
            Gerencie as categorias dos produtos
          </Text>
        </Box>
        <PizzaButton
          colorScheme="orange"
          leftIcon={<FaPlus />}
          onClick={handleCreate}
        >
          Nova Categoria
        </PizzaButton>
      </HStack>

      {/* Lista de Categorias */}
      {categorias.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" mb={4}>
            Nenhuma categoria cadastrada ainda.
          </Text>
          <PizzaButton
            colorScheme="orange"
            leftIcon={<FaPlus />}
            onClick={handleCreate}
          >
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
                      <Text fontSize="lg" fontWeight="semibold" color="gray.800">
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
                        icon={<FaEdit />}
                        onClick={() => handleEdit(categoria)}
                      />
                      <IconButton
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Deletar categoria"
                        icon={<FaTrash />}
                        onClick={() => handleDeleteClick(categoria)}
                      />
                    </HStack>
                  </HStack>
                </Box>

                <Box pt={2} borderTop="1px solid" borderColor="gray.100">
                  <Text fontSize="xs" color="gray.400">
                    Criado em: {new Date(categoria.createdAt).toLocaleDateString('pt-BR')}
                  </Text>
                  {categoria.updatedAt !== categoria.createdAt && (
                    <Text fontSize="xs" color="gray.400">
                      Atualizado: {new Date(categoria.updatedAt).toLocaleDateString('pt-BR')}
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
      <AlertDialog.Root open={isDeleteOpen} onOpenChange={onDeleteClose}>
        <AlertDialog.Backdrop />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Deletar Categoria</AlertDialog.Title>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <Text>
              Tem certeza que deseja deletar a categoria "{categoriaToDelete?.name}"?
              Esta ação não pode ser desfeita.
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <AlertDialog.ActionTrigger asChild>
              <Button variant="outline" onClick={onDeleteClose}>
                Cancelar
              </Button>
            </AlertDialog.ActionTrigger>
            <AlertDialog.ActionTrigger asChild>
              <PizzaButton colorScheme="red" onClick={handleDeleteConfirm}>
                Deletar
              </PizzaButton>
            </AlertDialog.ActionTrigger>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </VStack>
  );
};