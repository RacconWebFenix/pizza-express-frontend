/**
 * Hook para gerenciar estado de pedidos
 * @version 1.0.0
 * @since 28/12/2025
 */

import { useState, useCallback, useEffect } from 'react';
import type { Order, OrderFilters } from '@/types/order';
import { ordersService } from '../services/ordersService';
import { toaster } from '@/components/ui/toaster';

interface UseOrdersOptions {
  /**
   * Se deve buscar automaticamente na montagem
   */
  autoFetch?: boolean;

  /**
   * Filtros para busca
   */
  filters?: OrderFilters;

  /**
   * Se deve buscar pedidos de admin (todos os pedidos)
   */
  adminMode?: boolean;
}

interface UseOrdersReturn {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createOrder: typeof ordersService.create;
  updateOrderStatus: typeof ordersService.updateStatus;
}

/**
 * Hook para gerenciar lista de pedidos
 */
export const useOrders = (options: UseOrdersOptions = {}): UseOrdersReturn => {
  const { autoFetch = true, filters, adminMode = false } = options;

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca pedidos
   */
  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = adminMode
        ? await ordersService.getWithFilters(filters)
        : await ordersService.getMy(filters);

      setOrders(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar pedidos';
      setError(errorMessage);
      toaster.error({
        title: 'Erro ao buscar pedidos',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [filters, adminMode]);

  /**
   * Refetch manual
   */
  const refetch = useCallback(async () => {
    await fetchOrders();
  }, [fetchOrders]);

  /**
   * Busca automática na montagem
   */
  useEffect(() => {
    if (autoFetch) {
      fetchOrders();
    }
  }, [autoFetch, fetchOrders]);

  /**
   * Wrapper para criar pedido
   */
  const handleCreateOrder = useCallback(async (data: Parameters<typeof ordersService.create>[0]) => {
    try {
      const newOrder = await ordersService.create(data);
      setOrders(prev => [newOrder, ...prev]);
      toaster.success({
        title: 'Pedido criado',
        description: 'Seu pedido foi criado com sucesso!',
      });
      return newOrder;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar pedido';
      toaster.error({
        title: 'Erro ao criar pedido',
        description: errorMessage,
      });
      throw err;
    }
  }, []);

  /**
   * Wrapper para atualizar status
   */
  const handleUpdateOrderStatus = useCallback(async (orderId: number, status: string) => {
    try {
      const updatedOrder = await ordersService.updateStatus(orderId, status);
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? updatedOrder : order
        )
      );
      toaster.success({
        title: 'Status atualizado',
        description: 'Status do pedido foi atualizado com sucesso!',
      });
      return updatedOrder;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar status';
      toaster.error({
        title: 'Erro ao atualizar status',
        description: errorMessage,
      });
      throw err;
    }
  }, []);

  return {
    orders,
    isLoading,
    error,
    refetch,
    createOrder: handleCreateOrder,
    updateOrderStatus: handleUpdateOrderStatus,
  };
};