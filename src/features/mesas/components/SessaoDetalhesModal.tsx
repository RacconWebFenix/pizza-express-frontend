"use client";

import React, { useState, useEffect } from 'react';
import {
  Modal,
  VStack,
  HStack,
  Text,
  Badge,
  Box,
  Button,
  Divider,
  SimpleGrid,
  AlertDialog,
  useDisclosure,
} from '@chakra-ui/react';
import { FaClock, FaPlus, FaMoneyBillWave, FaChair } from 'react-icons/fa';
import { PizzaButton } from '@/components/ui';
import { useMesas } from '../hooks/useMesas';
import { useProdutos } from '../../produtos/hooks/useProdutos';
import { Mesa, SessaoMesa } from '@/types/mesa';
import { AdicionarPedidoModal } from './AdicionarPedidoModal';

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
  const { produtos } = useProdutos();
  const { isOpen: isPedidoOpen, onOpen: onPedidoOpen, onClose: onPedidoClose } = useDisclosure();
  const { isOpen: isFecharOpen, onOpen: onFecharOpen, onClose: onFecharClose } = useDisclosure();

  const [sessao, setSessao] = useState<SessaoMesa | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mesa && isOpen) {
      loadSessao();
    }
  }, [mesa, isOpen]);

  const loadSessao = async () => {
    if (!mesa) return;

    try {
      const sessaoData = await getSessaoAtiva(mesa.id);
      setSessao(sessaoData);
    } catch (error) {
      console.error('Erro ao carregar sessão:', error);
    }
  };

  const handleAbrirSessao = async () => {
    if (!mesa) return;

    setIsLoading(true);
    try {
      await abrirSessao(mesa.id);
      await loadSessao();
    } catch (error) {
      console.error('Erro ao abrir sessão:', error);
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
      console.error('Erro ao fechar conta:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePedidoAdicionado = () => {
    loadSessao(); // Recarregar sessão após adicionar pedido
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) {
      return `${diffMins} minutos`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      const remainingMins = diffMins % 60;
      return `${diffHours}h ${remainingMins}min`;
    }
  };

  if (!mesa) return null;

  const isMesaOcupada = mesa.status === 'OCCUPIED';
  const totalPedidos = sessao?.pedidos.length || 0;

  return (
    <>
      <Modal.Root open={isOpen} onOpenChange={onClose} size="xl">
        <Modal.Backdrop />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>
              <HStack gap={2}>
                <FaChair />
                <Text>Mesa {mesa.number}</Text>
                <Badge
                  colorScheme={isMesaOcupada ? 'red' : 'green'}
                  variant="subtle"
                >
                  {isMesaOcupada ? 'Ocupada' : 'Disponível'}
                </Badge>
              </HStack>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <VStack gap={6} align="stretch">
              {/* Status da Sessão */}
              {sessao ? (
                <Box>
                  <HStack justify="space-between" align="center" mb={4}>
                    <HStack gap={2}>
                      <FaClock />
                      <Text fontWeight="semibold">
                        Sessão ativa há {formatTime(sessao.criadoEm)}
                      </Text>
                    </HStack>
                    <Badge colorScheme="blue" variant="subtle">
                      {totalPedidos} pedido{totalPedidos !== 1 ? 's' : ''}
                    </Badge>
                  </HStack>

                  {/* Lista de Pedidos */}
                  <VStack gap={3} align="stretch" maxH="300px" overflowY="auto">
                    {sessao.pedidos.map((pedido, index) => (
                      <Box key={index} p={3} bg="gray.50" borderRadius="md">
                        <HStack justify="space-between" align="start">
                          <Box flex={1}>
                            <Text fontSize="sm" color="gray.600">
                              {new Date(pedido.criadoEm).toLocaleString('pt-BR')}
                            </Text>
                            {pedido.observacoes && (
                              <Text fontSize="sm" color="gray.500" mt={1}>
                                Obs: {pedido.observacoes}
                              </Text>
                            )}
                            <Text fontSize="sm" mt={2}>
                              {pedido.itens.map((item, idx) => (
                                <span key={idx}>
                                  {item.quantity}x {item.product?.name || 'Produto'}
                                  {idx < pedido.itens.length - 1 ? ', ' : ''}
                                </span>
                              ))}
                            </Text>
                          </Box>
                          <Text fontWeight="semibold">
                            {formatPrice(
                              pedido.itens.reduce(
                                (total, item) => total + (item.product?.price || 0) * item.quantity,
                                0
                              )
                            )}
                          </Text>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>

                  <Divider my={4} />

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
                    isLoading={isLoading}
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
                      isLoading={isLoading}
                      loadingText="Fechando conta..."
                    >
                      <FaMoneyBillWave />
                      Fechar Conta
                    </PizzaButton>
                  </>
                )}
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      {/* Modal de Adicionar Pedido */}
      <AdicionarPedidoModal
        isOpen={isPedidoOpen}
        onClose={onPedidoClose}
        mesa={mesa}
        onPedidoAdicionado={handlePedidoAdicionado}
      />

      {/* Modal de Confirmação de Fechar Conta */}
      <AlertDialog.Root open={isFecharOpen} onOpenChange={onFecharClose}>
        <AlertDialog.Backdrop />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Fechar Conta</AlertDialog.Title>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <Text>
              Tem certeza que deseja fechar a conta da Mesa {mesa.number}?
              O total é de {formatPrice(sessao?.total || 0)}.
            </Text>
            <Text fontSize="sm" color="gray.600" mt={2}>
              Esta ação irá liberar a mesa para novos clientes.
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <AlertDialog.ActionTrigger asChild>
              <Button variant="outline" onClick={onFecharClose}>
                Cancelar
              </Button>
            </AlertDialog.ActionTrigger>
            <AlertDialog.ActionTrigger asChild>
              <PizzaButton colorScheme="red" onClick={handleFecharConta}>
                Fechar Conta
              </PizzaButton>
            </AlertDialog.ActionTrigger>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};