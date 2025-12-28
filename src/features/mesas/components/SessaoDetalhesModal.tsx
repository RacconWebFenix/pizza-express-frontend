"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  VStack,
  HStack,
  Text,
  Badge,
  Box,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { AppModal } from "@/components/ui";
import { FaClock, FaPlus, FaMoneyBillWave } from "react-icons/fa";
import { PizzaButton } from "@/components/ui";
import { PizzaSpinner } from "@/components/ui";
import { useMesas } from "../hooks/useMesas";
import { Mesa, SessaoMesa } from "@/types/mesa";
import { AdicionarPedidoModal } from "./AdicionarPedidoModal";
import { PedidoCard } from "./PedidoCard";

interface SessaoDetalhesModalProps {
  isOpen: boolean;
  onClose: () => void;
  mesa: Mesa | null;
}

export const SessaoDetalhesModal: React.FC<SessaoDetalhesModalProps> = ({
  isOpen,
  onClose,
  mesa,
}) => {
  const { abrirSessao, fecharConta, getSessaoAtiva } = useMesas();
  const {
    open: isPedidoOpen,
    onOpen: onPedidoOpen,
    onClose: onPedidoClose,
  } = useDisclosure();
  const {
    open: isFecharOpen,
    onOpen: onFecharOpen,
    onClose: onFecharClose,
  } = useDisclosure();

  const [sessao, setSessao] = useState<SessaoMesa | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSessao, setIsLoadingSessao] = useState(false);

  const loadSessao = useCallback(async () => {
    if (!mesa) return;

    try {
      const sessaoData = await getSessaoAtiva(mesa.id);
      setSessao(sessaoData);
    } catch (error) {
      console.error("Erro ao carregar sessão:", error);
    } finally {
      setIsLoadingSessao(false);
    }
  }, [mesa, getSessaoAtiva]);

  useEffect(() => {
    if (mesa && isOpen) {
      setIsLoadingSessao(true);
      loadSessao();
    }
  }, [mesa, isOpen, loadSessao]);

  const handleAbrirSessao = async () => {
    if (!mesa) return;

    setIsLoading(true);
    try {
      await abrirSessao(mesa.id);
      await loadSessao();
    } catch (error) {
      console.error("Erro ao abrir sessão:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFecharConta = async () => {
    if (!mesa) return;

    setIsLoading(true);
    try {
      await fecharConta(mesa.id);
      onClose();
      onFecharClose();
    } catch (error) {
      console.error("Erro ao fechar conta:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePedidoAdicionado = () => {
    loadSessao(); // Recarregar sessão após adicionar pedido
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "Data inválida";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Data inválida";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 0) return "Data futura";

    if (diffMins < 60) {
      return `${diffMins} minutos`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      const remainingMins = diffMins % 60;
      return `${diffHours}h ${remainingMins}min`;
    }
  };

  if (!mesa) return null;

  const isMesaOcupada = mesa.status === "OCCUPIED";
  const totalPedidos = sessao?.pedidos?.length || 0;

  return (
    <>
      <AppModal
        isOpen={isOpen}
        onClose={onClose}
        title={`Mesa ${mesa.number} - ${
          isMesaOcupada ? "Ocupada" : "Disponível"
        }`}
      >
        <VStack gap={6} align="stretch">
          {/* Status da Sessão */}
          {isLoadingSessao ? (
            <Flex justify="center" align="center" py={8} direction="column">
              <PizzaSpinner />
              <Text mt={4} color="gray.500">
                Carregando pedidos...
              </Text>
            </Flex>
          ) : sessao ? (
            <Box>
              <HStack justify="space-between" align="center" mb={4}>
                <HStack gap={2}>
                  <FaClock />
                  <Text fontWeight="semibold">
                    Sessão ativa há {formatTime(sessao.criadoEm)}
                  </Text>
                </HStack>
                <Badge colorScheme="blue" variant="subtle">
                  {totalPedidos} pedido{totalPedidos !== 1 ? "s" : ""}
                </Badge>
              </HStack>

              {/* Lista de Pedidos */}
              <VStack gap={3} align="stretch" maxH="300px" overflowY="auto">
                {sessao.pedidos && sessao.pedidos.length > 0 ? (
                  sessao.pedidos.map((pedido, index) => (
                    <PedidoCard key={index} pedido={pedido} index={index} />
                  ))
                ) : (
                  <Box textAlign="center" py={4}>
                    <Text color="gray.500">
                      Nenhum pedido nesta sessão ainda.
                    </Text>
                  </Box>
                )}
              </VStack>

              <Box my={4} borderTop="1px solid" borderColor="gray.200" />

              {/* Total */}
              <HStack justify="space-between" align="center">
                <Text fontSize="lg" fontWeight="bold">
                  Total da Conta
                </Text>
                <Text fontSize="xl" fontWeight="bold" color="orange.500">
                  {formatPrice(sessao.total)}
                </Text>
              </HStack>
            </Box>
          ) : (
            <Box textAlign="center" py={8}>
              <Text color="gray.500" mb={4}>
                Mesa disponível para novos clientes.
              </Text>
            </Box>
          )}

          {/* Ações */}
          <HStack gap={3} justify="flex-end">
            {!sessao ? (
              <PizzaButton
                colorScheme="orange"
                onClick={handleAbrirSessao}
                loading={isLoading}
                loadingText="Abrindo mesa..."
              >
                Abrir Mesa para Cliente
              </PizzaButton>
            ) : (
              <>
                <Button variant="outline" onClick={onPedidoOpen}>
                  <FaPlus />
                  Adicionar Pedido
                </Button>
                <PizzaButton
                  colorScheme="red"
                  onClick={onFecharOpen}
                  loading={isLoading}
                  loadingText="Fechando conta..."
                >
                  <FaMoneyBillWave />
                  Fechar Conta
                </PizzaButton>
              </>
            )}
          </HStack>
        </VStack>
      </AppModal>

      {/* Modal de Adicionar Pedido */}
      <AdicionarPedidoModal
        isOpen={isPedidoOpen}
        onClose={onPedidoClose}
        mesa={mesa}
        sessionId={sessao?.id} // ✅ ADICIONAR PROP
        onPedidoAdicionado={handlePedidoAdicionado}
      />

      {/* Confirmação de Fechar Conta */}
      {isFecharOpen && (
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
          onClick={onFecharClose}
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
              Fechar Conta
            </Text>
            <Text mb={4}>
              Tem certeza que deseja fechar a conta da Mesa {mesa.number}? O
              total é de {formatPrice(sessao?.total || 0)}.
            </Text>
            <Text fontSize="sm" color="gray.600" mb={6}>
              Esta ação irá liberar a mesa para novos clientes.
            </Text>
            <HStack gap={3} justify="flex-end">
              <Button variant="outline" onClick={onFecharClose}>
                Cancelar
              </Button>
              <PizzaButton colorScheme="red" onClick={handleFecharConta}>
                Fechar Conta
              </PizzaButton>
            </HStack>
          </Box>
        </Box>
      )}
    </>
  );
};
