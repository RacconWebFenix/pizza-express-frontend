"use client";

import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  useDisclosure,
  IconButton,
  SimpleGrid,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaMotorcycle } from "react-icons/fa";
import { PizzaCard, PizzaButton } from "@/components/ui";
import { useEntregadores } from "../hooks/useEntregadores";
import { EntregadorFormModal } from "./EntregadorFormModal";
import { Entregador } from "@/types/entregador";

export const EntregadoresList: React.FC = () => {
  const { entregadores, isLoading, error, remove } = useEntregadores();
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
  const [selectedEntregador, setSelectedEntregador] =
    useState<Entregador | null>(null);
  const [entregadorToDelete, setEntregadorToDelete] =
    useState<Entregador | null>(null);

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
      } catch {
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
    const cleaned = phone.replace(/\D/g, "");
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
            Entregadores
          </Text>
          <Text color="gray.600">Gerencie os entregadores da pizzaria</Text>
        </Box>
        <PizzaButton colorScheme="orange" onClick={handleCreate}>
          Novo Entregador
        </PizzaButton>
      </HStack>

      {/* Lista de Entregadores */}
      {entregadores.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" mb={4}>
            Nenhum entregador cadastrado ainda.
          </Text>
          <PizzaButton colorScheme="orange" onClick={handleCreate}>
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
                    <Avatar.Fallback>
                      <FaMotorcycle />
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <Box flex={1}>
                    <HStack justify="space-between" align="start">
                      <Box flex={1}>
                        <Text
                          fontSize="lg"
                          fontWeight="semibold"
                          color="gray.800"
                        >
                          {entregador.nome}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {entregador.telefone
                            ? formatPhone(entregador.telefone)
                            : "Telefone não informado"}
                        </Text>
                      </Box>
                      <HStack gap={1}>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          aria-label="Editar entregador"
                          onClick={() => handleEdit(entregador)}
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          aria-label="Deletar entregador"
                          onClick={() => handleDeleteClick(entregador)}
                        >
                          <FaTrash />
                        </IconButton>
                      </HStack>
                    </HStack>
                  </Box>
                </HStack>

                {/* Status */}
                <Box>
                  <Badge colorScheme="green" variant="subtle" fontSize="xs">
                    Ativo
                  </Badge>
                </Box>

                {/* Informações adicionais */}
                <Box pt={2} borderTop="1px solid" borderColor="gray.100">
                  {entregador.createdAt && (
                    <Text fontSize="xs" color="gray.400">
                      Cadastrado em:{" "}
                      {new Date(entregador.createdAt).toLocaleDateString(
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
      <EntregadorFormModal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        entregador={selectedEntregador}
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
              Deletar Entregador
            </Text>
            <Text mb={4}>
              Tem certeza que deseja deletar o entregador &quot;
              {entregadorToDelete?.nome}&quot;? Esta ação não pode ser desfeita.
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
