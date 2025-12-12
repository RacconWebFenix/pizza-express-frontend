"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  VStack,
  HStack,
  Text,
  Button,
  Box,
  SimpleGrid,
  Badge,
  Textarea,
} from '@chakra-ui/react';
import { AppModal } from '@/components/ui';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { PizzaButton, PizzaInput } from '@/components/ui';
import { useMesas } from '../hooks/useMesas';
import { useProdutos } from '../../produtos/hooks/useProdutos';
import { Mesa } from '@/types/mesa';

const pedidoSchema = z.object({
  observacoes: z.string().optional(),
});

type PedidoFormData = z.infer<typeof pedidoSchema>;

interface AdicionarPedidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  mesa: Mesa | null;
  onPedidoAdicionado: () => void;
}

interface ItemPedido {
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
  };
}

export const AdicionarPedidoModal: React.FC<AdicionarPedidoModalProps> = ({
  isOpen,
  onClose,
  mesa,
  onPedidoAdicionado,
}) => {
  const { adicionarPedido } = useMesas();
  const { produtos } = useProdutos();
  const [itensPedido, setItensPedido] = useState<ItemPedido[]>([]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<PedidoFormData>({
    resolver: zodResolver(pedidoSchema),
  });

  const handleAddProduto = (produto: any) => {
    const existingItem = itensPedido.find(item => item.productId === produto.id);

    if (existingItem) {
      setItensPedido(prev =>
        prev.map(item =>
          item.productId === produto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setItensPedido(prev => [...prev, {
        productId: produto.id,
        quantity: 1,
        product: {
          id: produto.id,
          name: produto.name,
          price: produto.price,
        },
      }]);
    }
  };

  const handleRemoveItem = (productId: string) => {
    setItensPedido(prev => prev.filter(item => item.productId !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setItensPedido(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const onSubmit = async (data: PedidoFormData) => {
    if (!mesa || itensPedido.length === 0) return;

    try {
      const pedidoData = {
        type: 'DINE_IN' as const,
        items: itensPedido.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        tableId: mesa.id,
        observations: data.observacoes,
      };

      await adicionarPedido(pedidoData);
      onPedidoAdicionado();
      handleClose();
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
    }
  };

  const handleClose = () => {
    setItensPedido([]);
    reset();
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const totalPedido = itensPedido.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  );

  // Filtrar apenas produtos ativos
  const produtosAtivos = produtos.filter(produto => produto.active);

  return (
    <AppModal isOpen={isOpen} onClose={handleClose} title={`Adicionar Pedido - Mesa ${mesa?.number}`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={6} align="stretch">
              {/* Produtos Disponíveis */}
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={4}>
                  Produtos Disponíveis
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={3} maxH="300px" overflowY="auto">
                  {produtosAtivos.map((produto) => (
                    <Box
                      key={produto.id}
                      p={3}
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                      cursor="pointer"
                      onClick={() => handleAddProduto(produto)}
                      _hover={{ bg: "gray.50", borderColor: "orange.300" }}
                      transition="all 0.2s"
                    >
                      <VStack align="stretch" gap={1}>
                        <Text fontWeight="semibold" fontSize="sm">
                          {produto.name}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          {produto.description}
                        </Text>
                        <Text fontSize="sm" fontWeight="bold" color="orange.500">
                          {formatPrice(produto.price)}
                        </Text>
                      </VStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Itens do Pedido */}
              {itensPedido.length > 0 && (
                <Box>
                  <Text fontSize="lg" fontWeight="semibold" mb={4}>
                    Itens do Pedido
                  </Text>
                  <VStack gap={3} align="stretch">
                    {itensPedido.map((item) => (
                      <Box key={item.productId} p={3} bg="gray.50" borderRadius="md">
                        <HStack justify="space-between" align="center">
                          <Box flex={1}>
                            <Text fontWeight="semibold">{item.product.name}</Text>
                            <Text fontSize="sm" color="orange.500">
                              {formatPrice(item.product.price)} cada
                            </Text>
                          </Box>
                          <HStack gap={2} align="center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                            >
                              <FaMinus size={12} />
                            </Button>
                            <Text fontWeight="semibold" minW="30px" textAlign="center">
                              {item.quantity}
                            </Text>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                            >
                              <FaPlus size={12} />
                            </Button>
                            <Text fontWeight="semibold" color="orange.500" minW="80px" textAlign="right">
                              {formatPrice(item.product.price * item.quantity)}
                            </Text>
                            <Button
                              size="sm"
                              colorScheme="red"
                              variant="ghost"
                              onClick={() => handleRemoveItem(item.productId)}
                            >
                              Remover
                            </Button>
                          </HStack>
                        </HStack>
                      </Box>
                    ))}

                    {/* Total */}
                    <Box p={3} bg="orange.50" borderRadius="md">
                      <HStack justify="space-between" align="center">
                        <Text fontSize="lg" fontWeight="bold">
                          Total do Pedido
                        </Text>
                        <Text fontSize="lg" fontWeight="bold" color="orange.500">
                          {formatPrice(totalPedido)}
                        </Text>
                      </HStack>
                    </Box>
                  </VStack>
                </Box>
              )}

              {/* Observações */}
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  Observações (opcional)
                </Text>
                <Textarea
                  {...register('observacoes')}
                  placeholder="Ex: Sem cebola, bem passado, etc."
                  rows={3}
                />
              </Box>

              {/* Ações */}
              <HStack gap={3} justify="flex-end">
                <Button variant="outline" onClick={handleClose}>
                  Cancelar
                </Button>
                <PizzaButton
                  colorScheme="orange"
                  type="submit"
                  disabled={itensPedido.length === 0}
                  loading={isSubmitting}
                  loadingText="Adicionando pedido..."
                >
                  Adicionar Pedido
                </PizzaButton>
              </HStack>
            </VStack>
          </form>
    </AppModal>
  );
};