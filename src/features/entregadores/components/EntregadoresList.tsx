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
  Avatar,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaPlus, FaMotorcycle } from 'react-icons/fa';
import { PizzaCard, PizzaButton } from '@/components/ui';
import { useEntregadores } from '../hooks/useEntregadores';
import { EntregadorFormModal } from './EntregadorFormModal';
import { Entregador } from '@/types/entregador';

export const EntregadoresList: React.FC = () => {
  const { entregadores, isLoading, error, remove } = useEntregadores();
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [selectedEntregador, setSelectedEntregador] = useState<Entregador | null>(null);
  const [entregadorToDelete, setEntregadorToDelete] = useState<Entregador | null>(null);

  const handleEdit = (entregador: Entregador) => {
    setSelectedEntregador(entregador);
    onFormOpen();
  };

  const handleCreate = () => {
    setSelectedEntregador(null);
    onFormOpen();
  };

  const handleDeleteClick = (entregador: Entregador) => {
    setEntregadorToDelete(entregador);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    if (entregadorToDelete) {
      try {
        await remove(entregadorToDelete.id);
        onDeleteClose();
        setEntregadorToDelete(null);
      } catch (error) {
        // Error já tratado no hook
      }
    }
  };

  const handleFormClose = () => {
    setSelectedEntregador(null);
    onFormClose();
  };

  const formatPhone = (phone: string) => {
    // Formatar telefone brasileiro
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  if (isLoading) {
    return <Text>Carregando entregadores...</Text>;
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
            Entregadores
          </Text>
          <Text color="gray.600">
            Gerencie os entregadores da pizzaria
          </Text>
        </Box>
        <PizzaButton
          colorScheme="orange"
          leftIcon={<FaPlus />}
          onClick={handleCreate}
        >
          Novo Entregador
        </PizzaButton>
      </HStack>

      {/* Lista de Entregadores */}
      {entregadores.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" mb={4}>
            Nenhum entregador cadastrado ainda.
          </Text>
          <PizzaButton
            colorScheme="orange"
            leftIcon={<FaPlus />}
            onClick={handleCreate}
          >
            Cadastrar Primeiro Entregador
          </PizzaButton>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {entregadores.map((entregador) => (
            <PizzaCard key={entregador.id}>
              <VStack align="stretch" gap={3}>
                {/* Avatar e Nome */}
                <HStack gap={3}>
                  <Avatar.Root size="lg">
                    <Avatar.Image src={entregador.avatar} alt={entregador.nome} />
                    <Avatar.Fallback>
                      <FaMotorcycle />
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <Box flex={1}>
                    <HStack justify="space-between" align="start">
                      <Box flex={1}>
                        <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                          {entregador.nome}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {formatPhone(entregador.telefone)}
                        </Text>
                      </Box>
                      <HStack gap={1}>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          aria-label="Editar entregador"
                          icon={<FaEdit />}
                          onClick={() => handleEdit(entregador)}
                        />
                        <IconButton
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          aria-label="Deletar entregador"
                          icon={<FaTrash />}
                          onClick={() => handleDeleteClick(entregador)}
                        />
                      </HStack>
                    </HStack>
                  </Box>
                </HStack>

                {/* Status */}
                <Box>
                  <Badge
                    colorScheme={entregador.ativo ? 'green' : 'red'}
                    variant="subtle"
                    fontSize="xs"
                  >
                    {entregador.ativo ? 'Ativo' : 'Inativo'}
                  </Badge>
                </Box>

                {/* Informações adicionais */}
                <Box pt={2} borderTop="1px solid" borderColor="gray.100">
                  {entregador.totalEntregas !== undefined && (
                    <Text fontSize="sm" color="gray.600">
                      Total de entregas: {entregador.totalEntregas}
                    </Text>
                  )}
                  {entregador.createdAt && (
                    <Text fontSize="xs" color="gray.400">
                      Cadastrado em: {new Date(entregador.createdAt).toLocaleDateString('pt-BR')}
                    </Text>
                  )}
                </Box>
              </VStack>
            </PizzaCard>
          ))}
        </SimpleGrid>
      )}

      {/* Modal de Formulário */}
      <EntregadorFormModal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        entregador={selectedEntregador}
      />

      {/* Modal de Confirmação de Delete */}
      <AlertDialog.Root open={isDeleteOpen} onOpenChange={onDeleteClose}>
        <AlertDialog.Backdrop />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Deletar Entregador</AlertDialog.Title>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <Text>
              Tem certeza que deseja deletar o entregador "{entregadorToDelete?.nome}"?
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