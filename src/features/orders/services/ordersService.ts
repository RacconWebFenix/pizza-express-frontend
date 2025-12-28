/**
 * Service para gerenciar pedidos (orders)
 * @version 1.0.0
 * @since 28/12/2025
 */

import type {
  Order,
  CreateOrderDto,
  AddOrderItemDto,
  UpdateOrderItemQuantityDto,
  CancelOrderItemDto,
  OrderFilters,
  OrderItem,
} from '@/types/order';
import { getAuthToken } from '@/utils/cookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Erro customizado para operações de pedidos
 */
class OrderServiceError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'OrderServiceError';
  }
}

/**
 * Helper para fazer requisições autenticadas
 */
const fetchWithAuth = async (
  endpoint: string,
  options?: RequestInit
): Promise<Response> => {
  const token = getAuthToken();
  if (!token) {
    throw new OrderServiceError('Usuário não autenticado', 401);
  }

  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = 'Erro ao processar requisição';
    let details;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      details = errorData;
    } catch {
      // Se não conseguir parsear JSON, usa mensagem genérica
    }

    throw new OrderServiceError(errorMessage, response.status, details);
  }

  return response;
};

/**
 * Helper para tratar erros da API
 */

/**
 * Cria um novo pedido
 */
export const createOrder = async (data: CreateOrderDto): Promise<Order> => {
  try {
    const response = await fetchWithAuth('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError('Erro ao criar pedido', 500, error);
  }
};

/**
 * Busca todos os pedidos do usuário logado
 */
export const getMyOrders = async (filters?: OrderFilters): Promise<Order[]> => {
  try {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const endpoint = `/orders${queryString ? `?${queryString}` : ''}`;

    const response = await fetchWithAuth(endpoint);
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError('Erro ao buscar pedidos', 500, error);
  }
};

/**
 * Busca pedido por ID
 */
export const getOrderById = async (orderId: number): Promise<Order> => {
  try {
    const response = await fetchWithAuth(`/orders/${orderId}`);
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError('Erro ao buscar pedido', 500, error);
  }
};

/**
 * Adiciona item a um pedido existente
 */
export const addItemToOrder = async (
  orderId: number,
  item: AddOrderItemDto
): Promise<OrderItem> => {
  try {
    const response = await fetchWithAuth(`/orders/${orderId}/items`, {
      method: 'POST',
      body: JSON.stringify(item),
    });
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError('Erro ao adicionar item', 500, error);
  }
};

/**
 * Atualiza quantidade de um item do pedido
 */
export const updateItemQuantity = async (
  orderId: number,
  itemId: string,
  data: UpdateOrderItemQuantityDto
): Promise<OrderItem> => {
  try {
    const response = await fetchWithAuth(
      `/orders/${orderId}/items/${itemId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      }
    );
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError('Erro ao atualizar quantidade', 500, error);
  }
};

/**
 * Cancela um item do pedido
 */
export const cancelOrderItem = async (
  orderId: number,
  itemId: string,
  data: CancelOrderItemDto
): Promise<void> => {
  try {
    await fetchWithAuth(`/orders/${orderId}/items/${itemId}/cancel`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError('Erro ao cancelar item', 500, error);
  }
};

/**
 * Busca pedidos com filtros (admin/staff)
 */
export const getOrdersWithFilters = async (filters?: OrderFilters): Promise<Order[]> => {
  try {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const endpoint = `/orders/admin${queryString ? `?${queryString}` : ''}`;

    const response = await fetchWithAuth(endpoint);
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError('Erro ao buscar pedidos com filtros', 500, error);
  }
};

/**
 * Atualiza status do pedido (admin/staff)
 */
export const updateOrderStatus = async (
  orderId: number,
  status: string
): Promise<Order> => {
  try {
    const response = await fetchWithAuth(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError('Erro ao atualizar status', 500, error);
  }
};

/**
 * Exporta todas as funções do service
 */
export const ordersService = {
  create: createOrder,
  getMy: getMyOrders,
  getById: getOrderById,
  addItem: addItemToOrder,
  updateItemQuantity,
  cancelItem: cancelOrderItem,
  getWithFilters: getOrdersWithFilters,
  updateStatus: updateOrderStatus,
};

export default ordersService;