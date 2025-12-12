"use client";

import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  useDisclosure,
  AlertDialog,
  IconButton,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaPlus, FaImage } from 'react-icons/fa';
import { PizzaCard, PizzaButton } from '@/components/ui';
import { useProdutos } from '../hooks/useProdutos';
import { ProdutoFormModal } from './ProdutoFormModal';
import { Produto } from '@/types/produto';

export const ProdutosList: React.FC = () => {
  const { produtos, isLoading, error, remove } = useProdutos();
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
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

  const handleDeleteClick = (produto: Produto) => {
    setProdutoToDelete(produto);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    if (produtoToDelete) {
      try {
        await remove(produtoToDelete.id);
        onDeleteClose();
        setProdutoToDelete(null);
      } catch (error) {
        // Error já tratado no hook
      }
    }
  };

  const handleFormClose = () => {
    setSelectedProduto(null);
    onFormClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (isLoading) {
    return <Text>Carregando produtos...</Text>;
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
            Produtos
          </Text>
          <Text color="gray.600">
            Gerencie os produtos do cardápio
          </Text>
        </Box>
        <PizzaButton
          colorScheme="orange"
          leftIcon={<FaPlus />}
          onClick={handleCreate}
        >
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
            leftIcon={<FaPlus />}
            onClick={handleCreate}
          >
            Criar Primeiro Produto
          </PizzaButton>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {produtos.map((produto) => (
            <PizzaCard key={produto.id}>
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
                      <Text fontSize="sm" color="gray.600" noOfLines={2}>
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
                        icon={<FaEdit />}
                        onClick={() => handleEdit(produto)}
                      />
                      <IconButton
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Deletar produto"
                        icon={<FaTrash />}
                        onClick={() => handleDeleteClick(produto)}
                      />
                    </HStack>
                  </HStack>

                  {/* Categoria e Status */}
                  <HStack justify="space-between" align="center" mt={3}>
                    <Badge
                      colorScheme="blue"
                      variant="subtle"
                      fontSize="xs"
                    >
                      {produto.category?.name || 'Sem categoria'}
                    </Badge>
                    <Badge
                      colorScheme={produto.active ? 'green' : 'red'}
                      variant="subtle"
                      fontSize="xs"
                    >
                      {produto.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </HStack>
                </Box>

                {/* Data de criação */}
                <Box pt={2} borderTop="1px solid" borderColor="gray.100">
                  <Text fontSize="xs" color="gray.400">
                    Criado em: {new Date(produto.createdAt).toLocaleDateString('pt-BR')}
                  </Text>
                </Box>
              </VStack>
            </PizzaCard>
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
      <AlertDialog.Root open={isDeleteOpen} onOpenChange={onDeleteClose}>
        <AlertDialog.Backdrop />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Deletar Produto</AlertDialog.Title>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <Text>
              Tem certeza que deseja deletar o produto "{produtoToDelete?.name}"?
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