"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Separator,
  Spinner,
} from "@chakra-ui/react";
import { FaPlus, FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import { AppModal } from "@/components/ui";
import { EnderecoModal } from "./EnderecoModal";
import { getEnderecos, createEndereco } from "../services/enderecoService";
import { toaster } from "@/components/ui/toaster";
import type { Endereco } from "@/types/endereco";

interface EnderecoSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (endereco: Endereco) => void;
  selectedEnderecoId?: number;
}

export const EnderecoSelectionModal: React.FC<EnderecoSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedEnderecoId,
}) => {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEndereco, setSelectedEndereco] = useState<Endereco | null>(
    null
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadEnderecos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getEnderecos();
      setEnderecos(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao carregar endereços";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Buscar endereços quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      loadEnderecos();
    }
  }, [isOpen, loadEnderecos]);

  // Definir endereço padrão após carregar endereços
  useEffect(() => {
    if (enderecos.length > 0 && !selectedEndereco) {
      const enderecoPadrao = enderecos.find((e) => e.principal) || enderecos[0];
      setSelectedEndereco(enderecoPadrao);
    }
  }, [enderecos, selectedEndereco]);

  // Atualizar seleção quando selectedEnderecoId mudar
  useEffect(() => {
    if (selectedEnderecoId && enderecos.length > 0) {
      const endereco = enderecos.find((e) => e.id === selectedEnderecoId);
      if (endereco) {
        setSelectedEndereco(endereco);
      }
    }
  }, [selectedEnderecoId, enderecos]);

  // Buscar endereços quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      loadEnderecos();
    }
  }, [isOpen, loadEnderecos]);

  const handleSelect = () => {
    if (!selectedEndereco) {
      toaster.create({
        title: "Seleção obrigatória",
        description: "Selecione um endereço para entrega.",
        type: "warning",
      });
      return;
    }

    onSelect(selectedEndereco);
    onClose();
  };

  const handleCreateEndereco = async (data: {
    cep: string;
    tipo: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento?: string;
    principal: boolean;
  }) => {
    try {
      const novoEndereco = await createEndereco(data);
      toaster.create({
        title: "Endereço criado!",
        description: "Novo endereço adicionado com sucesso.",
        type: "success",
      });

      // Recarregar lista de endereços
      await loadEnderecos();

      // Selecionar o novo endereço automaticamente
      setSelectedEndereco(novoEndereco);

      // Fechar modal de criação
      setIsCreateModalOpen(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao criar endereço";
      throw new Error(message);
    }
  };

  const formatEndereco = (endereco: Endereco) => {
    return `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}/${endereco.estado}`;
  };

  return (
    <>
      <AppModal
        isOpen={isOpen}
        onClose={onClose}
        title="Selecionar Endereço de Entrega"
      >
        <VStack align="stretch" gap={4}>
          {error && (
            <Box
              p={4}
              bg="red.50"
              borderRadius="md"
              border="1px"
              borderColor="red.200"
            >
              <Text color="red.600" fontSize="sm">
                {error}
              </Text>
            </Box>
          )}

          {isLoading ? (
            <Box textAlign="center" py={8}>
              <Spinner size="lg" color="green.500" />
              <Text mt={2}>Carregando endereços...</Text>
            </Box>
          ) : enderecos.length === 0 ? (
            <Box textAlign="center" py={8}>
              <FaMapMarkerAlt
                size={48}
                style={{ color: "gray", margin: "0 auto" }}
              />
              <Text mt={4} color="gray.600">
                Nenhum endereço cadastrado
              </Text>
              <Text fontSize="sm" color="gray.500" mb={4}>
                Adicione um endereço para continuar
              </Text>
              <Button
                colorScheme="green"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <HStack gap={2}>
                  <FaPlus />
                  <Text>Criar Primeiro Endereço</Text>
                </HStack>
              </Button>
            </Box>
          ) : (
            <>
              <Text fontWeight="medium" color="gray.700">
                Selecione o endereço de entrega:
              </Text>

              <VStack align="stretch" gap={3}>
                {enderecos.map((endereco) => (
                  <Box
                    key={endereco.id}
                    p={4}
                    borderWidth="2px"
                    borderRadius="md"
                    borderColor={
                      selectedEndereco?.id === endereco.id
                        ? "green.300"
                        : "gray.200"
                    }
                    bg={
                      selectedEndereco?.id === endereco.id
                        ? "green.50"
                        : "white"
                    }
                    cursor="pointer"
                    onClick={() => setSelectedEndereco(endereco)}
                    transition="all 0.2s"
                    _hover={{ borderColor: "green.300", bg: "green.50" }}
                  >
                    <HStack align="start" gap={3}>
                      <Box mt={1}>
                        {selectedEndereco?.id === endereco.id ? (
                          <FaCheck color="green" />
                        ) : (
                          <Box
                            w={4}
                            h={4}
                            borderRadius="full"
                            border="2px"
                            borderColor="gray.300"
                          />
                        )}
                      </Box>
                      <VStack align="start" gap={1} flex={1}>
                        <HStack gap={2}>
                          <FaMapMarkerAlt style={{ color: "green" }} />
                          <Text fontWeight="medium">
                            {endereco.tipo}{" "}
                            {endereco.principal && "(Principal)"}
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          {formatEndereco(endereco)}
                        </Text>
                        {endereco.complemento && (
                          <Text fontSize="sm" color="gray.500">
                            Complemento: {endereco.complemento}
                          </Text>
                        )}
                        <Text
                          fontSize="sm"
                          color="green.600"
                          fontWeight="medium"
                        >
                          CEP: {endereco.cep}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>

              <Separator />

              <Button
                variant="outline"
                colorScheme="green"
                onClick={() => setIsCreateModalOpen(true)}
                w="full"
              >
                <HStack gap={2}>
                  <FaPlus />
                  <Text>Adicionar Novo Endereço</Text>
                </HStack>
              </Button>

              <HStack gap={3} pt={4}>
                <Button variant="outline" onClick={onClose} flex={1}>
                  Cancelar
                </Button>
                <Button
                  colorScheme="green"
                  onClick={handleSelect}
                  flex={1}
                  disabled={!selectedEndereco}
                >
                  Confirmar Endereço
                </Button>
              </HStack>
            </>
          )}
        </VStack>
      </AppModal>

      <EnderecoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateEndereco}
      />
    </>
  );
};
