/**
 * Tipos para o sistema de pedidos moderno
 * @version 1.0.0
 * @since 28/12/2025
 */

import type { Endereco } from "./endereco";

/**
 * Tipo de pedido
 */
export type OrderType = "DELIVERY" | "DINE_IN";

/**
 * Status do pedido
 */
export type OrderStatus =
  | "PENDENTE" // Aguardando confirmação
  | "EM_PREPARO" // Em preparação
  | "A_CAMINHO" // A caminho (delivery)
  | "PRONTO" // Pronto para retirada (dine-in)
  | "ENTREGUE" // Entregue
  | "CANCELADO"; // Cancelado

/**
 * Status do item do pedido
 */
export type OrderItemStatus =
  | "PENDING" // Aguardando confirmação
  | "CONFIRMED" // Confirmado
  | "PREPARING" // Em preparação
  | "READY" // Pronto
  | "CANCELLED"; // Cancelado

/**
 * Item de um pedido
 */
export interface OrderItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: string;
    imageUrl?: string;
  };
  quantity: number;
  price: string; // Preço unitário no momento do pedido
  subtotal: string; // quantity * price
  status: OrderItemStatus;
  notes?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Pedido completo
 */
export interface Order {
  id: number;
  type: OrderType;
  status: OrderStatus;
  total: string; // Total calculado
  deliveryFee?: string; // Taxa de entrega (se aplicável)
  userId?: number;
  user?: {
    id: number;
    nome: string;
    email: string;
  };
  addressId?: number;
  address?: Endereco;
  sessionId?: string; // Para pedidos DINE_IN
  session?: {
    id: string;
    table: {
      id: string;
      number: number;
    };
  };
  items: OrderItem[];
  canModify: boolean; // Se ainda pode modificar itens
  createdAt: string;
  updatedAt?: string;
}

/**
 * DTO para criar pedido
 */
export interface CreateOrderDto {
  type: OrderType;
  addressId?: number; // Obrigatório para DELIVERY
  sessionId?: string; // Obrigatório para DINE_IN
  items: {
    productId: string;
    quantity: number;
    notes?: string;
  }[];
  observations?: string;
}

/**
 * DTO para adicionar item ao pedido
 */
export interface AddOrderItemDto {
  productId: string;
  quantity: number;
  notes?: string;
}

/**
 * DTO para atualizar quantidade do item
 */
export interface UpdateOrderItemQuantityDto {
  quantity: number;
}

/**
 * DTO para cancelar item
 */
export interface CancelOrderItemDto {
  reason: string;
}

/**
 * DTO para filtros de busca de pedidos
 */
export interface OrderFilters {
  status?: OrderStatus;
  type?: OrderType;
  userId?: number;
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Helper para calcular total do pedido
 */
export const calculateOrderTotal = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => {
    const subtotal = parseFloat(item.subtotal);
    return sum + (isNaN(subtotal) ? 0 : subtotal);
  }, 0);
};

/**
 * Helper para verificar se pedido pode ser modificado
 */
export const canModifyOrder = (order: Order): boolean => {
  return (
    order.canModify &&
    (order.status === "PENDENTE" || order.status === "EM_PREPARO")
  );
};

/**
 * Helper para verificar se pedido é delivery
 */
export const isDeliveryOrder = (order: Order): boolean => {
  return order.type === "DELIVERY";
};

/**
 * Helper para verificar se pedido é dine-in
 */
export const isDineInOrder = (order: Order): boolean => {
  return order.type === "DINE_IN";
};

/**
 * Helper para obter status display do pedido
 */
export const getOrderStatusDisplay = (
  status: OrderStatus
): { label: string; colorScheme: string } => {
  const statusMap: Record<OrderStatus, { label: string; colorScheme: string }> =
    {
      PENDENTE: { label: "Pendente", colorScheme: "gray" },
      EM_PREPARO: { label: "Em Preparo", colorScheme: "yellow" },
      A_CAMINHO: { label: "A Caminho", colorScheme: "blue" },
      PRONTO: { label: "Pronto", colorScheme: "green" },
      ENTREGUE: { label: "Entregue", colorScheme: "green" },
      CANCELADO: { label: "Cancelado", colorScheme: "red" },
    };

  return statusMap[status] || { label: status, colorScheme: "gray" };
};

/**
 * Helper para obter status display do item
 */
export const getOrderItemStatusDisplay = (
  status: OrderItemStatus
): { label: string; colorScheme: string } => {
  const statusMap: Record<
    OrderItemStatus,
    { label: string; colorScheme: string }
  > = {
    PENDING: { label: "Pendente", colorScheme: "gray" },
    CONFIRMED: { label: "Confirmado", colorScheme: "blue" },
    PREPARING: { label: "Preparando", colorScheme: "yellow" },
    READY: { label: "Pronto", colorScheme: "green" },
    CANCELLED: { label: "Cancelado", colorScheme: "red" },
  };

  return statusMap[status] || { label: status, colorScheme: "gray" };
};
