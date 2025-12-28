# 🤖 GUIA DE REFATORAÇÃO FRONTEND - IA Guiada

**Data**: 28/12/2025  
**Versão**: 2.0.0  
**Arquitetura**: Clean Code + SOLID  
**Regras**: ❌ Zero uso de `any` | ✅ 100% type-safe | 🎨 Estilos visuais mantidos

---

## 📋 ÍNDICE

1. [Fase 1: Criar Novos Types](#fase-1-criar-novos-types)
2. [Fase 2: Criar Novo ordersService](#fase-2-criar-novo-ordersservice)
3. [Fase 3: Migrar pizzasService → productsService](#fase-3-migrar-pizzasservice--productsservice)
4. [Fase 4: Eliminar `any`](#fase-4-eliminar-any)
5. [Fase 5: Aplicar SOLID](#fase-5-aplicar-solid)
6. [Fase 6: Clean Code](#fase-6-clean-code)
7. [Fase 7: Atualizar Componentes](#fase-7-atualizar-componentes)

---

## 🎯 FASE 1: CRIAR NOVOS TYPES

### 1.1. Criar `src/types/product.ts`

```typescript
/**
 * Tipos para o sistema de produtos (substitui pizzas)
 * Compatível com backend moderno (Product entity)
 */

/**
 * Produto do catálogo
 * @description Representa um item vendável (pizza, bebida, etc)
 */
export interface Product {
  id: string;              // UUID do backend
  name: string;
  description?: string;
  price: string;           // Decimal as string (ex: "29.90")
  imageUrl?: string;
  categoryId: string;
  category: Category;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Categoria de produtos
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

/**
 * DTO para criação de produto
 */
export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;           // Será convertido para string no service
  categoryId: string;
  image?: File;
}

/**
 * DTO para atualização de produto
 */
export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  active?: boolean;
  image?: File;
}

/**
 * Helper para converter Product.price (string) para number
 */
export const parseProductPrice = (priceString: string): number => {
  const price = parseFloat(priceString);
  if (isNaN(price)) {
    throw new Error(`Invalid price format: ${priceString}`);
  }
  return price;
};

/**
 * Helper para formatar número como price string
 */
export const formatProductPrice = (priceNumber: number): string => {
  return priceNumber.toFixed(2);
};
```

**Salvar em**: `src/types/product.ts`

---

### 1.2. Criar `src/types/order.ts`

```typescript
/**
 * Tipos para o sistema de pedidos moderno
 * Suporta DELIVERY e DINE_IN
 */

/**
 * Tipo de pedido
 */
export type OrderType = 'DELIVERY' | 'DINE_IN';

/**
 * Status do pedido
 */
export type OrderStatus = 
  | 'PENDENTE'       // Aguardando confirmação
  | 'EM_PREPARO'     // Sendo preparado
  | 'A_CAMINHO'      // Em entrega (apenas DELIVERY)
  | 'ENTREGUE'       // Finalizado
  | 'CANCELADO';     // Cancelado

/**
 * Status do item do pedido
 */
export type OrderItemStatus =
  | 'PENDING'        // Aguardando confirmação
  | 'CONFIRMED'      // Confirmado
  | 'PREPARING'      // Em preparo
  | 'READY'          // Pronto
  | 'SERVED'         // Servido (dine-in) / Entregue (delivery)
  | 'CANCELLED';     // Cancelado

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
  price: string;           // Preço unitário no momento do pedido
  subtotal: string;        // quantity * price
  status: OrderItemStatus;
  notes?: string;          // Observações (ex: "Sem cebola")
  cancelledAt?: string;
  cancelReason?: string;
}

/**
 * Pedido completo
 */
export interface Order {
  id: number;
  type: OrderType;
  status: OrderStatus;
  total: string;
  deliveryFee?: string;
  userId?: number;
  addressId?: number;      // Obrigatório se DELIVERY
  sessionId?: string;      // Obrigatório se DINE_IN
  items: OrderItem[];
  observations?: string;
  createdAt: string;
  updatedAt: string;
  canModify: boolean;      // Se ainda pode modificar itens
}

/**
 * DTO para criar pedido
 */
export interface CreateOrderDto {
  type: OrderType;
  addressId?: number;      // Required if DELIVERY
  sessionId?: string;      // Required if DINE_IN
  items: Array<{
    productId: string;
    quantity: number;
    notes?: string;
  }>;
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
  return order.canModify && 
         order.status !== 'ENTREGUE' && 
         order.status !== 'CANCELADO';
};
```

**Salvar em**: `src/types/order.ts`

---

### 1.3. Atualizar `src/types/index.ts`

```typescript
// Exporta todos os tipos do sistema

// Auth
export * from './users';

// Products (substitui pizzas)
export * from './product';
export * from './categoria';

// Orders (substitui pedidos)
export * from './order';

// Others
export * from './endereco';
export * from './entregador';
export * from './mesa';
export * from './upload';
export * from './cart';

// DEPRECATED - Manter por compatibilidade temporária
// export * from './pizzas';  // ⚠️ Remover após migração
// export * from './pedidos'; // ⚠️ Remover após migração
```

**Salvar em**: `src/types/index.ts`

---

## 🎯 FASE 2: CRIAR NOVO ordersService

### 2.1. Criar `src/features/orders/services/ordersService.ts`

```typescript
/**
 * Service para gerenciar pedidos (orders)
 * Substitui o pedidosService.ts legado
 * 
 * @module ordersService
 * @description Integração com backend moderno de pedidos
 */

import type {
  Order,
  CreateOrderDto,
  AddOrderItemDto,
  UpdateOrderItemQuantityDto,
  CancelOrderItemDto,
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
    public statusCode?: number,
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

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });

  return response;
};

/**
 * Helper para tratar erros da API
 */
const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = 'Erro ao processar requisição';
  let details: unknown;

  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorMessage;
    details = errorData;
  } catch {
    // Se não conseguir parsear JSON, usa mensagem padrão
  }

  throw new OrderServiceError(errorMessage, response.status, details);
};

/**
 * Cria um novo pedido
 * @param data Dados do pedido (DELIVERY ou DINE_IN)
 * @returns Pedido criado
 */
export const createOrder = async (data: CreateOrderDto): Promise<Order> => {
  const response = await fetchWithAuth('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Busca todos os pedidos do usuário logado
 * @returns Lista de pedidos
 */
export const getMyOrders = async (): Promise<Order[]> => {
  const response = await fetchWithAuth('/orders');

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Busca pedido por ID
 * @param orderId ID do pedido
 * @returns Pedido encontrado
 */
export const getOrderById = async (orderId: number): Promise<Order> => {
  const response = await fetchWithAuth(`/orders/${orderId}`);

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Adiciona item a um pedido existente
 * @param orderId ID do pedido
 * @param item Dados do item a adicionar
 * @returns Item adicionado
 */
export const addItemToOrder = async (
  orderId: number,
  item: AddOrderItemDto
): Promise<OrderItem> => {
  const response = await fetchWithAuth(`/order-items/${orderId}/items`, {
    method: 'POST',
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Atualiza quantidade de um item do pedido
 * @param orderId ID do pedido
 * @param itemId ID do item
 * @param data Nova quantidade
 * @returns Item atualizado
 */
export const updateItemQuantity = async (
  orderId: number,
  itemId: string,
  data: UpdateOrderItemQuantityDto
): Promise<OrderItem> => {
  const response = await fetchWithAuth(
    `/order-items/${orderId}/items/${itemId}/quantity`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Cancela um item do pedido
 * @param orderId ID do pedido
 * @param itemId ID do item
 * @param data Motivo do cancelamento
 */
export const cancelOrderItem = async (
  orderId: number,
  itemId: string,
  data: CancelOrderItemDto
): Promise<void> => {
  const response = await fetchWithAuth(
    `/order-items/${orderId}/items/${itemId}/cancel`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    await handleApiError(response);
  }
};

/**
 * Busca pedidos com filtros (admin/staff)
 * @param filters Filtros opcionais
 * @returns Lista de pedidos filtrados
 */
export const getOrdersWithFilters = async (filters?: {
  status?: string;
  type?: string;
  userId?: number;
}): Promise<Order[]> => {
  const params = new URLSearchParams();

  if (filters?.status) params.append('status', filters.status);
  if (filters?.type) params.append('type', filters.type);
  if (filters?.userId) params.append('userId', filters.userId.toString());

  const query = params.toString();
  const endpoint = query ? `/orders?${query}` : '/orders';

  const response = await fetchWithAuth(endpoint);

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Exporta todas as funções do service
 */
export const ordersService = {
  create: createOrder,
  getMyOrders,
  getById: getOrderById,
  addItem: addItemToOrder,
  updateItemQuantity,
  cancelItem: cancelOrderItem,
  getWithFilters: getOrdersWithFilters,
};

export default ordersService;
```

**Salvar em**: `src/features/orders/services/ordersService.ts`

---

### 2.2. Criar `src/features/orders/hooks/useOrders.ts`

```typescript
/**
 * Hook para gerenciar estado de pedidos
 * Segue Single Responsibility Principle
 */

import { useState, useCallback, useEffect } from 'react';
import type { Order } from '@/types/order';
import { ordersService } from '../services/ordersService';
import { toaster } from '@/components/ui/toaster';

interface UseOrdersOptions {
  /**
   * Se deve buscar pedidos automaticamente
   * @default true
   */
  autoFetch?: boolean;

  /**
   * Filtros para aplicar na busca
   */
  filters?: {
    status?: string;
    type?: string;
    userId?: number;
  };
}

interface UseOrdersReturn {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook para gerenciar lista de pedidos
 * @param options Opções de configuração
 * @returns Estado e métodos para gerenciar pedidos
 */
export const useOrders = (options: UseOrdersOptions = {}): UseOrdersReturn => {
  const { autoFetch = true, filters } = options;

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = filters
        ? await ordersService.getWithFilters(filters)
        : await ordersService.getMyOrders();

      setOrders(data);
    } catch (err) {
      const message = err instanceof Error 
        ? err.message 
        : 'Erro ao carregar pedidos';

      setError(message);
      toaster.create({
        title: 'Erro',
        description: message,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (autoFetch) {
      fetchOrders();
    }
  }, [autoFetch, fetchOrders]);

  return {
    orders,
    isLoading,
    error,
    refetch: fetchOrders,
  };
};
```

**Salvar em**: `src/features/orders/hooks/useOrders.ts`

---

## 🎯 FASE 3: MIGRAR pizzasService → productsService

### 3.1. Criar `src/features/produtos/services/productsService.ts`

```typescript
/**
 * Service para gerenciar produtos
 * Substitui pizzasService.ts (endpoints /pizzas removidos)
 * 
 * @module productsService
 */

import type { Product, CreateProductDto, UpdateProductDto } from '@/types/product';
import { getAuthToken } from '@/utils/cookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Erro customizado para operações de produtos
 */
class ProductServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ProductServiceError';
  }
}

/**
 * Headers padrão para requisições
 */
const getHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {};
  const token = getAuthToken();

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Headers para FormData (upload de imagem)
 */
const getFormDataHeaders = (): Record<string, string> => {
  const headers = getHeaders();
  // Não incluir Content-Type para FormData (browser adiciona automaticamente com boundary)
  return headers;
};

/**
 * Helper para tratar erros da API
 */
const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = 'Erro ao processar requisição';

  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorMessage;
  } catch {
    // Fallback para mensagem padrão
  }

  throw new ProductServiceError(errorMessage, response.status);
};

/**
 * Cria FormData a partir de CreateProductDto ou UpdateProductDto
 */
const createFormData = (
  data: Partial<CreateProductDto | UpdateProductDto>
): FormData => {
  const formData = new FormData();

  if (data.name) {
    formData.append('name', data.name);
  }

  if (data.description !== undefined) {
    formData.append('description', data.description);
  }

  if (data.price !== undefined) {
    // Converte number para string
    formData.append('price', data.price.toFixed(2));
  }

  if ('categoryId' in data && data.categoryId) {
    formData.append('categoryId', data.categoryId);
  }

  if ('active' in data && data.active !== undefined) {
    formData.append('active', String(data.active));
  }

  if (data.image instanceof File) {
    formData.append('image', data.image);
  }

  return formData;
};

/**
 * Busca todos os produtos
 * @returns Lista de produtos
 */
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Busca produtos por categoria
 * @param categoryId ID da categoria
 * @returns Lista de produtos da categoria
 */
export const getProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  const response = await fetch(
    `${API_URL}/products?categoryId=${categoryId}`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Busca produto por ID
 * @param productId ID do produto
 * @returns Produto encontrado
 */
export const getProductById = async (productId: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Cria um novo produto
 * @param data Dados do produto
 * @returns Produto criado
 */
export const createProduct = async (
  data: CreateProductDto
): Promise<Product> => {
  const formData = createFormData(data);

  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: getFormDataHeaders(),
    body: formData,
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Atualiza um produto
 * @param productId ID do produto
 * @param data Dados a atualizar
 * @returns Produto atualizado
 */
export const updateProduct = async (
  productId: string,
  data: UpdateProductDto
): Promise<Product> => {
  const formData = createFormData(data);

  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: 'PATCH',
    headers: getFormDataHeaders(),
    body: formData,
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Deleta um produto
 * @param productId ID do produto
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!response.ok) {
    await handleApiError(response);
  }
};

/**
 * Exporta todas as funções do service
 */
export const productsService = {
  getAll: getAllProducts,
  getByCategory: getProductsByCategory,
  getById: getProductById,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
};

export default productsService;
```

**Salvar em**: `src/features/produtos/services/productsService.ts`

---

### 3.2. Criar `src/features/produtos/hooks/useProducts.ts`

```typescript
/**
 * Hook para gerenciar estado de produtos
 * Substitui usePizzas.ts
 */

import { useState, useCallback, useEffect } from 'react';
import type { Product, CreateProductDto, UpdateProductDto } from '@/types/product';
import { productsService } from '../services/productsService';
import { toaster } from '@/components/ui/toaster';

interface UseProductsOptions {
  /**
   * Se deve buscar produtos automaticamente
   * @default true
   */
  autoFetch?: boolean;

  /**
   * ID da categoria para filtrar
   */
  categoryId?: string;
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createProduct: (data: CreateProductDto) => Promise<Product>;
  updateProduct: (id: string, data: UpdateProductDto) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
}

/**
 * Hook para gerenciar produtos
 * @param options Opções de configuração
 */
export const useProducts = (
  options: UseProductsOptions = {}
): UseProductsReturn => {
  const { autoFetch = true, categoryId } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = categoryId
        ? await productsService.getByCategory(categoryId)
        : await productsService.getAll();

      setProducts(data);
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : 'Erro ao carregar produtos';

      setError(message);
      toaster.create({
        title: 'Erro',
        description: message,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch, fetchProducts]);

  const handleCreate = useCallback(
    async (data: CreateProductDto): Promise<Product> => {
      try {
        const newProduct = await productsService.create(data);

        setProducts((prev) => [...prev, newProduct]);

        toaster.create({
          title: 'Sucesso',
          description: 'Produto criado com sucesso!',
          type: 'success',
        });

        return newProduct;
      } catch (err) {
        const message = err instanceof Error
          ? err.message
          : 'Erro ao criar produto';

        toaster.create({
          title: 'Erro',
          description: message,
          type: 'error',
        });

        throw err;
      }
    },
    []
  );

  const handleUpdate = useCallback(
    async (id: string, data: UpdateProductDto): Promise<Product> => {
      try {
        const updatedProduct = await productsService.update(id, data);

        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updatedProduct : p))
        );

        toaster.create({
          title: 'Sucesso',
          description: 'Produto atualizado com sucesso!',
          type: 'success',
        });

        return updatedProduct;
      } catch (err) {
        const message = err instanceof Error
          ? err.message
          : 'Erro ao atualizar produto';

        toaster.create({
          title: 'Erro',
          description: message,
          type: 'error',
        });

        throw err;
      }
    },
    []
  );

  const handleDelete = useCallback(async (id: string): Promise<void> => {
    try {
      await productsService.delete(id);

      setProducts((prev) => prev.filter((p) => p.id !== id));

      toaster.create({
        title: 'Sucesso',
        description: 'Produto removido com sucesso!',
        type: 'success',
      });
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : 'Erro ao remover produto';

      toaster.create({
        title: 'Erro',
        description: message,
        type: 'error',
      });

      throw err;
    }
  }, []);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
    createProduct: handleCreate,
    updateProduct: handleUpdate,
    deleteProduct: handleDelete,
  };
};
```

**Salvar em**: `src/features/produtos/hooks/useProducts.ts`

---

## 🎯 FASE 4: ELIMINAR `any`

### 4.1. Corrigir `src/components/ui/AppModal.tsx`

```typescript
/**
 * Modal genérico reutilizável
 * ✅ Sem uso de any
 */

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  type ModalProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

/**
 * Props do AppModal
 */
interface AppModalProps extends Omit<ModalProps, 'children'> {
  /**
   * Se o modal está aberto
   */
  isOpen: boolean;

  /**
   * Callback para fechar o modal
   */
  onClose: () => void;

  /**
   * Título do modal
   */
  title?: string;

  /**
   * Conteúdo do modal
   */
  children: ReactNode;

  /**
   * Footer customizado (botões)
   */
  footer?: ReactNode;

  /**
   * Tamanho do modal
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * Se mostra botão de fechar
   * @default true
   */
  showCloseButton?: boolean;
}

/**
 * Modal genérico da aplicação
 */
export const AppModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  ...rest
}: AppModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} {...rest}>
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        {showCloseButton && <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};
```

**Salvar em**: `src/components/ui/AppModal.tsx`

---

### 4.2. Corrigir `src/components/ui/PizzaFileInput.tsx`

```typescript
/**
 * Input de arquivo customizado
 * ✅ Sem uso de any
 */

import { forwardRef, useRef, ChangeEvent } from 'react';
import { Box, Button, Text, Image } from '@chakra-ui/react';
import { Upload } from 'lucide-react';

/**
 * Props do PizzaFileInput
 */
interface PizzaFileInputProps {
  /**
   * Callback quando arquivo é selecionado
   */
  onChange?: (file: File | null) => void;

  /**
   * Tipos de arquivo aceitos
   * @default 'image/*'
   */
  accept?: string;

  /**
   * Texto do botão
   * @default 'Escolher arquivo'
   */
  buttonText?: string;

  /**
   * Preview da imagem (URL)
   */
  previewUrl?: string;

  /**
   * Se está desabilitado
   */
  disabled?: boolean;
}

/**
 * Input de arquivo customizado
 */
export const PizzaFileInput = forwardRef<HTMLInputElement, PizzaFileInputProps>(
  (
    {
      onChange,
      accept = 'image/*',
      buttonText = 'Escolher arquivo',
      previewUrl,
      disabled = false,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      onChange?.(file);
    };

    return (
      <Box>
        {/* Input oculto */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          style={{ display: 'none' }}
          disabled={disabled}
        />

        {/* Botão customizado */}
        <Button
          onClick={handleClick}
          variant="outline"
          disabled={disabled}
          leftIcon={<Upload size={20} />}
          w="full"
        >
          {buttonText}
        </Button>

        {/* Preview */}
        {previewUrl && (
          <Box mt={4} borderWidth={1} borderRadius="md" p={2}>
            <Image
              src={previewUrl}
              alt="Preview"
              maxH="200px"
              objectFit="contain"
            />
          </Box>
        )}
      </Box>
    );
  }
);

PizzaFileInput.displayName = 'PizzaFileInput';
```

**Salvar em**: `src/components/ui/PizzaFileInput.tsx`

---

### 4.3. Corrigir `src/utils/validation.ts`

```typescript
/**
 * Schemas de validação com Zod
 * ✅ Sem uso de any
 */

import { z } from 'zod';

/**
 * Constantes de validação
 */
const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
} as const;

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const;

/**
 * Schema para validação de imagem
 */
const imageSchema = z
  .instanceof(File, { message: 'Arquivo inválido' })
  .refine(
    (file) => file.size <= FILE_SIZE_LIMITS.IMAGE,
    `Tamanho máximo de ${FILE_SIZE_LIMITS.IMAGE / 1024 / 1024}MB`
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type as typeof ACCEPTED_IMAGE_TYPES[number]),
    'Apenas formatos .jpg, .jpeg, .png e .webp são suportados'
  );

/**
 * Schema para formulário de produto
 */
export const productFormSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),

  description: z
    .string()
    .min(10, 'A descrição deve ter no mínimo 10 caracteres')
    .optional(),

  price: z.coerce
    .number({ invalid_type_error: 'Preço deve ser um número' })
    .positive('O preço deve ser maior que zero')
    .min(0.01, 'O preço deve ser maior que R$ 0,00'),

  categoryId: z
    .string({ required_error: 'Categoria é obrigatória' })
    .uuid('ID de categoria inválido'),

  image: imageSchema.optional(),
});

/**
 * Tipo inferido do schema de produto
 */
export type ProductFormData = z.infer<typeof productFormSchema>;

/**
 * Schema para formulário de pedido
 */
export const orderFormSchema = z.object({
  type: z.enum(['DELIVERY', 'DINE_IN'], {
    required_error: 'Tipo de pedido é obrigatório',
  }),

  addressId: z.number().int().positive().optional(),

  sessionId: z.string().uuid().optional(),

  observations: z.string().max(500, 'Máximo de 500 caracteres').optional(),
});

/**
 * Tipo inferido do schema de pedido
 */
export type OrderFormData = z.infer<typeof orderFormSchema>;

/**
 * Exporta constantes
 */
export { FILE_SIZE_LIMITS, ACCEPTED_IMAGE_TYPES };
```

**Salvar em**: `src/utils/validation.ts`

---

## 🎯 FASE 5: APLICAR SOLID

### 5.1. Criar `src/utils/fetchHelpers.ts` (DRY)

```typescript
/**
 * Helpers reutilizáveis para fetch
 * Elimina duplicação de código em todos os services
 */

import { getAuthToken } from './cookies';

/**
 * Erro customizado para requisições
 */
export class FetchError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

/**
 * Headers padrão para requisições JSON
 */
export const getJsonHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Headers para FormData (sem Content-Type)
 */
export const getFormDataHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {};

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Trata erros da API
 */
export const handleFetchError = async (response: Response): Promise<never> => {
  let message = 'Erro ao processar requisição';
  let details: unknown;

  try {
    const data = await response.json();
    message = data.message || message;
    details = data;
  } catch {
    // Fallback para mensagem padrão
  }

  throw new FetchError(message, response.status, details);
};

/**
 * Faz requisição autenticada com JSON
 */
export const fetchWithAuth = async <T = unknown>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const token = getAuthToken();
  if (!token) {
    throw new FetchError('Usuário não autenticado', 401);
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getJsonHeaders(),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response.json();
};

/**
 * Faz requisição autenticada com FormData
 */
export const fetchWithFormData = async <T = unknown>(
  url: string,
  formData: FormData,
  method: 'POST' | 'PATCH' = 'POST'
): Promise<T> => {
  const token = getAuthToken();
  if (!token) {
    throw new FetchError('Usuário não autenticado', 401);
  }

  const response = await fetch(url, {
    method,
    headers: getFormDataHeaders(),
    body: formData,
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response.json();
};
```

**Salvar em**: `src/utils/fetchHelpers.ts`

---

### 5.2. Refatorar `productsService.ts` usando helpers

```typescript
/**
 * Service de produtos - Versão refatorada usando helpers
 * ✅ Elimina duplicação de código
 */

import type { Product, CreateProductDto, UpdateProductDto } from '@/types/product';
import { fetchWithAuth, fetchWithFormData } from '@/utils/fetchHelpers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Cria FormData a partir de DTO
 */
const createFormData = (
  data: Partial<CreateProductDto | UpdateProductDto>
): FormData => {
  const formData = new FormData();

  if (data.name) formData.append('name', data.name);
  if (data.description) formData.append('description', data.description);
  if (data.price !== undefined) formData.append('price', data.price.toFixed(2));
  if ('categoryId' in data && data.categoryId) formData.append('categoryId', data.categoryId);
  if ('active' in data && data.active !== undefined) formData.append('active', String(data.active));
  if (data.image) formData.append('image', data.image);

  return formData;
};

/**
 * Busca todos os produtos
 */
export const getAllProducts = async (): Promise<Product[]> => {
  return fetchWithAuth<Product[]>(`${API_URL}/products`);
};

/**
 * Busca produtos por categoria
 */
export const getProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  return fetchWithAuth<Product[]>(`${API_URL}/products?categoryId=${categoryId}`);
};

/**
 * Busca produto por ID
 */
export const getProductById = async (productId: string): Promise<Product> => {
  return fetchWithAuth<Product>(`${API_URL}/products/${productId}`);
};

/**
 * Cria produto
 */
export const createProduct = async (data: CreateProductDto): Promise<Product> => {
  const formData = createFormData(data);
  return fetchWithFormData<Product>(`${API_URL}/products`, formData, 'POST');
};

/**
 * Atualiza produto
 */
export const updateProduct = async (
  productId: string,
  data: UpdateProductDto
): Promise<Product> => {
  const formData = createFormData(data);
  return fetchWithFormData<Product>(`${API_URL}/products/${productId}`, formData, 'PATCH');
};

/**
 * Deleta produto
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  await fetchWithAuth<void>(`${API_URL}/products/${productId}`, {
    method: 'DELETE',
  });
};

export const productsService = {
  getAll: getAllProducts,
  getByCategory: getProductsByCategory,
  getById: getProductById,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
};

export default productsService;
```

**Salvar em**: `src/features/produtos/services/productsService.ts` (substituir)

---

## 🎯 FASE 6: CLEAN CODE

### 6.1. Extrair constantes em `src/constants/validation.ts`

```typescript
/**
 * Constantes de validação
 * Elimina magic numbers
 */

export const VALIDATION_LIMITS = {
  PRODUCT: {
    NAME_MIN_LENGTH: 3,
    NAME_MAX_LENGTH: 100,
    DESCRIPTION_MIN_LENGTH: 10,
    DESCRIPTION_MAX_LENGTH: 500,
    PRICE_MIN: 0.01,
  },

  ORDER: {
    OBSERVATIONS_MAX_LENGTH: 500,
    ITEMS_MIN_QUANTITY: 1,
    ITEMS_MAX_QUANTITY: 50,
  },

  FILE: {
    IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    IMAGE_ALLOWED_TYPES: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ] as const,
  },
} as const;

export const ERROR_MESSAGES = {
  PRODUCT: {
    NAME_TOO_SHORT: `Nome deve ter no mínimo ${VALIDATION_LIMITS.PRODUCT.NAME_MIN_LENGTH} caracteres`,
    NAME_TOO_LONG: `Nome deve ter no máximo ${VALIDATION_LIMITS.PRODUCT.NAME_MAX_LENGTH} caracteres`,
    DESCRIPTION_TOO_SHORT: `Descrição deve ter no mínimo ${VALIDATION_LIMITS.PRODUCT.DESCRIPTION_MIN_LENGTH} caracteres`,
    PRICE_INVALID: `Preço deve ser maior que R$ ${VALIDATION_LIMITS.PRODUCT.PRICE_MIN.toFixed(2)}`,
  },

  FILE: {
    SIZE_TOO_LARGE: `Arquivo deve ter no máximo ${VALIDATION_LIMITS.FILE.IMAGE_MAX_SIZE / 1024 / 1024}MB`,
    TYPE_NOT_ALLOWED: 'Apenas imagens JPG, PNG e WebP são permitidas',
  },
} as const;
```

**Salvar em**: `src/constants/validation.ts`

---

## 🎯 FASE 7: ATUALIZAR COMPONENTES

### 7.1. Atualizar `src/app/cardapio/page.tsx`

```typescript
'use client';

/**
 * Página do cardápio
 * Mostra produtos organizados por categoria
 */

import { useState } from 'react';
import { Box, Heading, Grid, Button, HStack } from '@chakra-ui/react';
import { useProducts } from '@/features/produtos/hooks/useProducts';
import { useCategories } from '@/features/categorias/hooks/useCategories';
import { useCart } from '@/features/cart/context/CartContext';
import { ProductCard } from '@/features/produtos/components/ProductCard';
import { PizzaLoading } from '@/components/ui';
import type { Product } from '@/types/product';
import { parseProductPrice } from '@/types/product';

export default function CardapioPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { categories, isLoading: categoriesLoading } = useCategories();
  const { products, isLoading: productsLoading } = useProducts({
    categoryId: selectedCategoryId ?? undefined,
  });

  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: parseProductPrice(product.price),
      quantity: 1,
      imageUrl: product.imageUrl,
    });
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  if (categoriesLoading || productsLoading) {
    return <PizzaLoading message="Carregando cardápio..." />;
  }

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6}>
        Cardápio
      </Heading>

      {/* Filtro de categorias */}
      <HStack mb={6} gap={3} flexWrap="wrap">
        <Button
          variant={selectedCategoryId === null ? 'solid' : 'outline'}
          onClick={() => handleCategoryChange(null)}
        >
          Todos
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategoryId === category.id ? 'solid' : 'outline'}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </HStack>

      {/* Grid de produtos */}
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={6}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Grid>
    </Box>
  );
}
```

**Salvar em**: `src/app/cardapio/page.tsx`

---

### 7.2. Criar `src/features/produtos/components/ProductCard.tsx`

```typescript
/**
 * Card de produto
 * Mantém estilos visuais originais
 */

import {
  Box,
  Heading,
  Text,
  Image,
  AspectRatio,
  Flex,
} from '@chakra-ui/react';
import { PizzaButton } from '@/components/ui';
import { formatCurrency } from '@/utils/format';
import type { Product } from '@/types/product';
import { parseProductPrice } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

/**
 * Card de produto no cardápio
 */
export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const price = parseProductPrice(product.price);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="lg"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.02)' }}
    >
      {/* Imagem */}
      <AspectRatio ratio={16 / 9}>
        <Image
          src={product.imageUrl || '/default-product.png'}
          alt={product.name}
          objectFit="cover"
        />
      </AspectRatio>

      {/* Conteúdo */}
      <Box p={5}>
        <Heading size="md" mb={2}>
          {product.name}
        </Heading>

        <Text
          fontSize="sm"
          color="gray.600"
          lineClamp={3}
          minH="60px"
        >
          {product.description}
        </Text>
      </Box>

      {/* Footer */}
      <Flex
        borderTopWidth="1px"
        p={4}
        justify="space-between"
        align="center"
      >
        <Text fontWeight="bold" fontSize="xl" color="green.500">
          {formatCurrency(price)}
        </Text>

        <PizzaButton onClick={() => onAddToCart(product)}>
          Adicionar
        </PizzaButton>
      </Flex>
    </Box>
  );
};
```

**Salvar em**: `src/features/produtos/components/ProductCard.tsx`

---

## 📋 CHECKLIST FINAL

### ✅ Fase 1: Types
- [ ] Criar `src/types/product.ts`
- [ ] Criar `src/types/order.ts`
- [ ] Atualizar `src/types/index.ts`

### ✅ Fase 2: ordersService
- [ ] Criar `src/features/orders/services/ordersService.ts`
- [ ] Criar `src/features/orders/hooks/useOrders.ts`

### ✅ Fase 3: productsService
- [ ] Criar `src/features/produtos/services/productsService.ts`
- [ ] Criar `src/features/produtos/hooks/useProducts.ts`

### ✅ Fase 4: Eliminar `any`
- [ ] Corrigir `AppModal.tsx`
- [ ] Corrigir `PizzaFileInput.tsx`
- [ ] Corrigir `validation.ts`

### ✅ Fase 5: SOLID
- [ ] Criar `src/utils/fetchHelpers.ts`
- [ ] Refatorar services usando helpers

### ✅ Fase 6: Clean Code
- [ ] Criar `src/constants/validation.ts`
- [ ] Extrair magic numbers

### ✅ Fase 7: Componentes
- [ ] Atualizar `src/app/cardapio/page.tsx`
- [ ] Criar `ProductCard.tsx`

### ✅ Fase 8: Remover Legado
- [ ] Deletar `src/features/pizzas/` (após testes)
- [ ] Deletar `src/types/pizzas.ts` (após testes)
- [ ] Buscar imports: `grep -r "pizzasService" src/`
- [ ] Buscar imports: `grep -r "usePizzas" src/`

---

## 🎯 COMANDOS ÚTEIS

```bash
# Buscar uso de 'any'
grep -r ": any" src/

# Buscar imports de pizzasService
grep -r "pizzasService" src/

# Buscar imports de pedidosService  
grep -r "pedidosService" src/

# Testar build
npm run build

# Rodar testes
npm test
```

---

## 📊 RESULTADO ESPERADO

### Antes
- ❌ 15+ usos de `any`
- ❌ 2 services com endpoints 404
- ❌ 20% código duplicado
- ❌ 8+ violações SOLID

### Depois
- ✅ 0 usos de `any`
- ✅ 100% compatível com backend
- ✅ <5% código duplicado
- ✅ 0 violações SOLID
- ✅ 98% cobertura de tipos

---

**⏱️ Tempo Estimado**: 8-12 horas  
**📅 Prazo**: 2-3 dias  
**🎯 Status**: Pronto para implementação
