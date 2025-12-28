# 🚀 GUIA PARA COMPLETAR A REFATORAÇÃO
**Data**: 28/12/2025  
**Tempo Estimado**: 4-6 horas  
**Prioridade**: 🔴 CRÍTICA

---

## 📋 TAREFAS RESTANTES

### ✅ JÁ IMPLEMENTADO (60%)
- [x] types/product.ts
- [x] types/order.ts
- [x] productsService.ts
- [x] fetchHelpers.ts
- [x] useProducts.ts
- [x] ProductCard.tsx
- [x] CartContext migrado

### ❌ FALTANDO (40%)
- [ ] **ordersService.ts** (CRÍTICO)
- [ ] **useOrders.ts** (CRÍTICO)
- [ ] Migrar CheckoutForm
- [ ] Deletar código legado
- [ ] Testes finais

---

## 🔴 TAREFA 1: Criar ordersService.ts (2-3h) - URGENTE

### Passo 1.1: Criar estrutura de pastas

```bash
mkdir -p src/features/orders/services
mkdir -p src/features/orders/hooks
mkdir -p src/features/orders/components
```

### Passo 1.2: Criar ordersService.ts

**Arquivo**: `src/features/orders/services/ordersService.ts`

```typescript
/**
 * Service para gerenciar pedidos modernos
 * @version 1.0.0
 * @since 28/12/2025
 */

import type { 
  Order, 
  CreateOrderDto, 
  AddOrderItemDto,
  UpdateOrderItemQuantityDto,
  CancelOrderItemDto,
  OrderFilters 
} from 'types/order'
import { fetchWithAuth } from 'utils/fetchHelpers'

/**
 * Erro customizado para operações de pedidos
 */
class OrderServiceError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message)
    this.name = 'OrderServiceError'
  }
}

/**
 * Cria um novo pedido
 */
export const createOrder = async (data: CreateOrderDto): Promise<Order> => {
  try {
    return await fetchWithAuth<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'FetchError') {
      throw error
    }
    throw new OrderServiceError('Erro ao criar pedido', 500, error)
  }
}

/**
 * Busca todos os pedidos do usuário
 */
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    return await fetchWithAuth<Order[]>('/orders')
  } catch (error) {
    if (error instanceof Error && error.name === 'FetchError') {
      throw error
    }
    throw new OrderServiceError('Erro ao buscar pedidos', 500, error)
  }
}

/**
 * Busca pedido por ID
 */
export const getOrderById = async (orderId: number): Promise<Order> => {
  try {
    return await fetchWithAuth<Order>(`/orders/${orderId}`)
  } catch (error) {
    if (error instanceof Error && error.name === 'FetchError') {
      throw error
    }
    throw new OrderServiceError('Erro ao buscar pedido', 500, error)
  }
}

/**
 * Busca pedidos com filtros
 */
export const getOrdersWithFilters = async (
  filters?: OrderFilters
): Promise<Order[]> => {
  try {
    const params = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })
    }

    const queryString = params.toString()
    const endpoint = `/orders${queryString ? `?${queryString}` : ''}`

    return await fetchWithAuth<Order[]>(endpoint)
  } catch (error) {
    if (error instanceof Error && error.name === 'FetchError') {
      throw error
    }
    throw new OrderServiceError('Erro ao buscar pedidos com filtros', 500, error)
  }
}

/**
 * Adiciona item a um pedido existente
 */
export const addOrderItem = async (
  orderId: number,
  data: AddOrderItemDto
): Promise<Order> => {
  try {
    return await fetchWithAuth<Order>(`/orders/${orderId}/items`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'FetchError') {
      throw error
    }
    throw new OrderServiceError('Erro ao adicionar item ao pedido', 500, error)
  }
}

/**
 * Atualiza quantidade de um item
 */
export const updateOrderItemQuantity = async (
  orderId: number,
  itemId: string,
  data: UpdateOrderItemQuantityDto
): Promise<Order> => {
  try {
    return await fetchWithAuth<Order>(
      `/orders/${orderId}/items/${itemId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      }
    )
  } catch (error) {
    if (error instanceof Error && error.name === 'FetchError') {
      throw error
    }
    throw new OrderServiceError('Erro ao atualizar item', 500, error)
  }
}

/**
 * Cancela um item do pedido
 */
export const cancelOrderItem = async (
  orderId: number,
  itemId: string,
  data: CancelOrderItemDto
): Promise<Order> => {
  try {
    return await fetchWithAuth<Order>(
      `/orders/${orderId}/items/${itemId}/cancel`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    )
  } catch (error) {
    if (error instanceof Error && error.name === 'FetchError') {
      throw error
    }
    throw new OrderServiceError('Erro ao cancelar item', 500, error)
  }
}

/**
 * Exporta todas as funções do service
 */
export const ordersService = {
  create: createOrder,
  getAll: getAllOrders,
  getById: getOrderById,
  getWithFilters: getOrdersWithFilters,
  addItem: addOrderItem,
  updateItemQuantity: updateOrderItemQuantity,
  cancelItem: cancelOrderItem,
}

export default ordersService
```

### Passo 1.3: Criar index.ts

**Arquivo**: `src/features/orders/services/index.ts`

```typescript
export * from './ordersService'
```

---

## 🔴 TAREFA 2: Criar useOrders.ts (1h)

**Arquivo**: `src/features/orders/hooks/useOrders.ts`

```typescript
/**
 * Hook para gerenciar estado de pedidos
 * @version 1.0.0
 * @since 28/12/2025
 */

import { useState, useCallback, useEffect } from 'react'
import type { 
  Order, 
  CreateOrderDto, 
  AddOrderItemDto,
  UpdateOrderItemQuantityDto,
  CancelOrderItemDto,
  OrderFilters 
} from 'types/order'
import { ordersService } from '../services/ordersService'
import { toaster } from 'components/ui/toaster'

interface UseOrdersOptions {
  /** Se deve buscar automaticamente na montagem */
  autoFetch?: boolean
  /** Filtros para busca */
  filters?: OrderFilters
}

interface UseOrdersReturn {
  orders: Order[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  createOrder: (data: CreateOrderDto) => Promise<Order>
  addItem: (orderId: number, data: AddOrderItemDto) => Promise<Order>
  updateItemQuantity: (
    orderId: number,
    itemId: string,
    data: UpdateOrderItemQuantityDto
  ) => Promise<Order>
  cancelItem: (
    orderId: number,
    itemId: string,
    data: CancelOrderItemDto
  ) => Promise<Order>
}

/**
 * Hook para gerenciar pedidos
 */
export const useOrders = (
  options: UseOrdersOptions = {}
): UseOrdersReturn => {
  const { autoFetch = true, filters } = options

  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Busca pedidos
  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      let data: Order[]
      if (filters) {
        data = await ordersService.getWithFilters(filters)
      } else {
        data = await ordersService.getAll()
      }

      setOrders(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar pedidos'
      setError(errorMessage)
      toaster.error({
        title: 'Erro ao buscar pedidos',
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  // Refetch manual
  const refetch = useCallback(async () => {
    await fetchOrders()
  }, [fetchOrders])

  // Busca automática na montagem
  useEffect(() => {
    if (autoFetch) {
      fetchOrders()
    }
  }, [autoFetch, fetchOrders])

  // Wrapper para criar pedido
  const handleCreateOrder = useCallback(
    async (data: CreateOrderDto): Promise<Order> => {
      try {
        const newOrder = await ordersService.create(data)
        setOrders((prev) => [...prev, newOrder])
        toaster.success({
          title: 'Pedido criado',
          description: 'Pedido foi criado com sucesso!',
        })
        return newOrder
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao criar pedido'
        toaster.error({
          title: 'Erro ao criar pedido',
          description: errorMessage,
        })
        throw err
      }
    },
    []
  )

  // Wrapper para adicionar item
  const handleAddItem = useCallback(
    async (orderId: number, data: AddOrderItemDto): Promise<Order> => {
      try {
        const updatedOrder = await ordersService.addItem(orderId, data)
        setOrders((prev) =>
          prev.map((order) => (order.id === orderId ? updatedOrder : order))
        )
        toaster.success({
          title: 'Item adicionado',
          description: 'Item foi adicionado ao pedido!',
        })
        return updatedOrder
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao adicionar item'
        toaster.error({
          title: 'Erro ao adicionar item',
          description: errorMessage,
        })
        throw err
      }
    },
    []
  )

  // Wrapper para atualizar quantidade
  const handleUpdateItemQuantity = useCallback(
    async (
      orderId: number,
      itemId: string,
      data: UpdateOrderItemQuantityDto
    ): Promise<Order> => {
      try {
        const updatedOrder = await ordersService.updateItemQuantity(
          orderId,
          itemId,
          data
        )
        setOrders((prev) =>
          prev.map((order) => (order.id === orderId ? updatedOrder : order))
        )
        toaster.success({
          title: 'Quantidade atualizada',
          description: 'Quantidade do item foi atualizada!',
        })
        return updatedOrder
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar quantidade'
        toaster.error({
          title: 'Erro ao atualizar',
          description: errorMessage,
        })
        throw err
      }
    },
    []
  )

  // Wrapper para cancelar item
  const handleCancelItem = useCallback(
    async (
      orderId: number,
      itemId: string,
      data: CancelOrderItemDto
    ): Promise<Order> => {
      try {
        const updatedOrder = await ordersService.cancelItem(orderId, itemId, data)
        setOrders((prev) =>
          prev.map((order) => (order.id === orderId ? updatedOrder : order))
        )
        toaster.success({
          title: 'Item cancelado',
          description: 'Item foi cancelado com sucesso!',
        })
        return updatedOrder
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao cancelar item'
        toaster.error({
          title: 'Erro ao cancelar',
          description: errorMessage,
        })
        throw err
      }
    },
    []
  )

  return {
    orders,
    isLoading,
    error,
    refetch,
    createOrder: handleCreateOrder,
    addItem: handleAddItem,
    updateItemQuantity: handleUpdateItemQuantity,
    cancelItem: handleCancelItem,
  }
}
```

### Criar index.ts

**Arquivo**: `src/features/orders/hooks/index.ts`

```typescript
export * from './useOrders'
```

---

## 🔴 TAREFA 3: Migrar CheckoutForm (1h)

**Arquivo**: `src/features/cart/components/CheckoutForm.tsx`

### Passo 3.1: Substituir imports

```typescript
// ❌ ANTES (LINHA 10):
import { createPedido } from 'features/pedidos/services/pedidosService'

// ✅ DEPOIS:
import { ordersService } from 'features/orders/services/ordersService'
import type { CreateOrderDto } from 'types/order'
```

### Passo 3.2: Atualizar função handlePaymentSuccess

```typescript
// ❌ ANTES:
const handlePaymentSuccess = async (intentId: string) => {
  setIsPaymentModalOpen(false)
  setIsSubmitting(true)

  try {
    const orderData = {
      clienteId: user!.id,
      enderecoId: selectedEndereco!.id,
      pizzasIds: cart.items.flatMap(item => 
        Array(item.quantity).fill(item.product.id)
      ),
      paymentIntentId: intentId,
    }

    await createPedido(orderData)

    toaster.create({
      title: 'Pedido realizado!',
      description: 'Seu pedido foi enviado com sucesso.',
      type: 'success',
    })

    clearCart()
    onClose()
  } catch (error: unknown) {
    const message = error instanceof Error 
      ? error.message 
      : 'Falha ao criar pedido. Tente novamente.'
    toaster.create({
      title: 'Erro',
      description: message,
      type: 'error',
    })
  } finally {
    setIsSubmitting(false)
  }
}

// ✅ DEPOIS:
const handlePaymentSuccess = async (intentId: string) => {
  setIsPaymentModalOpen(false)
  setIsSubmitting(true)

  try {
    const orderData: CreateOrderDto = {
      type: 'DELIVERY',  // ✅ Tipo explícito
      addressId: selectedEndereco!.id,  // ✅ addressId, não enderecoId
      items: cart.items.map(item => ({  // ✅ items[], não pizzasIds[]
        productId: item.product.id,
        quantity: item.quantity,
      })),
      observations: 'Pagamento via Stripe',  // ✅ Opcional
    }

    await ordersService.create(orderData)  // ✅ ordersService, não createPedido

    toaster.create({
      title: 'Pedido realizado!',
      description: 'Seu pedido foi enviado com sucesso.',
      type: 'success',
    })

    clearCart()
    onClose()
  } catch (error: unknown) {
    const message = error instanceof Error 
      ? error.message 
      : 'Falha ao criar pedido. Tente novamente.'
    toaster.create({
      title: 'Erro',
      description: message,
      type: 'error',
    })
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## 🔴 TAREFA 4: Deletar código legado (30min)

### Passo 4.1: Verificar imports antigos

```bash
# Buscar por imports de pizzasService:
grep -rn "from 'features/pizzas'" src/

# Buscar por imports de pedidosService:
grep -rn "from 'features/pedidos/services/pedidosService'" src/

# Buscar por imports de usePizzas:
grep -rn "from 'features/pizzas/hooks/usePizzas'" src/
```

### Passo 4.2: Atualizar imports encontrados

Para cada arquivo encontrado, substituir:
```typescript
// ❌ Remover:
import { getPizzas } from 'features/pizzas/services/pizzasService'
import { createPedido } from 'features/pedidos/services/pedidosService'
import { usePizzas } from 'features/pizzas/hooks/usePizzas'

// ✅ Adicionar:
import { productsService } from 'features/produtos/services/productsService'
import { ordersService } from 'features/orders/services/ordersService'
import { useProducts } from 'features/produtos/hooks/useProducts'
```

### Passo 4.3: Deletar arquivos

```bash
# ❌ Deletar pasta inteira de pizzas:
rm -rf src/features/pizzas/

# ❌ Deletar services antigos de pedidos:
rm src/features/pedidos/services/pedidosService.ts

# ❌ Deletar hooks antigos de pedidos:
rm src/features/pedidos/hooks/usePedidos.ts
rm src/features/pedidos/hooks/useMeusPedidos.ts

# ✅ Verificar se ainda existe algo:
find src/features/pizzas 2>/dev/null && echo "ERRO: Pasta pizzas ainda existe!" || echo "OK"
find src/features/pedidos/services/pedidosService.ts 2>/dev/null && echo "ERRO: pedidosService ainda existe!" || echo "OK"
```

### Passo 4.4: Atualizar types/index.ts

**Arquivo**: `src/types/index.ts`

```typescript
// ❌ Remover estas linhas:
export * from './pizzas'  // Remover
export * from './pedidos'  // Remover

// ✅ Verificar se estas existem:
export * from './product'  // ✅ Manter
export * from './order'    // ✅ Manter
```

---

## 🔴 TAREFA 5: Testes finais (1h)

### Passo 5.1: Testar build

```bash
npm run build

# Verificar warnings:
# ✅ Espera-se: 0 warnings de tipos
# ✅ Espera-se: 0 erros de compilação
```

### Passo 5.2: Testar no navegador

```bash
npm run dev

# Abrir: http://localhost:3000
```

### Checklist de testes:

- [ ] **Cardápio**: Listar produtos
  - Endpoint: `GET /products`
  - Componente: `src/app/cardapio/page.tsx`
  - Esperado: Lista de produtos com imagens

- [ ] **Adicionar ao carrinho**
  - Componente: `ProductCard`
  - Esperado: Badge do carrinho atualiza

- [ ] **Criar pedido DELIVERY**
  - Endpoint: `POST /orders`
  - Componente: `CheckoutForm`
  - Body:
    ```json
    {
      "type": "DELIVERY",
      "addressId": 1,
      "items": [
        { "productId": "uuid", "quantity": 2 }
      ]
    }
    ```
  - Esperado: Status 201, pedido criado

- [ ] **Criar pedido DINE_IN**
  - Endpoint: `POST /orders`
  - Body:
    ```json
    {
      "type": "DINE_IN",
      "sessionId": "uuid",
      "items": [
        { "productId": "uuid", "quantity": 1 }
      ]
    }
    ```
  - Esperado: Status 201, pedido criado

- [ ] **Listar pedidos**
  - Endpoint: `GET /orders`
  - Componente: `src/app/pedidos/page.tsx`
  - Esperado: Lista de pedidos do usuário

- [ ] **Modificar item do pedido**
  - Endpoint: `PATCH /orders/:id/items/:itemId`
  - Body:
    ```json
    {
      "quantity": 3
    }
    ```
  - Esperado: Status 200, item atualizado

---

## 📊 CHECKLIST FINAL

### Antes de abrir PR

- [ ] `npm run build` - OK (0 erros)
- [ ] `npm run lint` - OK (0 erros críticos)
- [ ] Buscar `pizzasService`: 0 ocorrências
- [ ] Buscar `pedidosService`: 0 ocorrências (exceto em pedidos legados)
- [ ] Buscar `createPedido`: 0 ocorrências
- [ ] Testar criar pedido no navegador
- [ ] Testar listar pedidos
- [ ] Verificar console do navegador (sem erros 404)
- [ ] Verificar Network tab (todos requests 200/201)

### Arquivos finais esperados

```
src/
├── features/
│   ├── orders/              ✅ NOVO
│   │   ├── services/
│   │   │   ├── ordersService.ts     ✅ CRIAR
│   │   │   └── index.ts             ✅ CRIAR
│   │   └── hooks/
│   │       ├── useOrders.ts         ✅ CRIAR
│   │       └── index.ts             ✅ CRIAR
│   │
│   ├── produtos/            ✅ JÁ EXISTE
│   │   ├── services/
│   │   │   └── productsService.ts   ✅ OK
│   │   └── hooks/
│   │       └── useProducts.ts       ✅ OK
│   │
│   ├── pizzas/              ❌ DELETAR
│   └── pedidos/             📝 LIMPAR (manter só componentes UI)
│
├── types/
│   ├── product.ts           ✅ OK
│   ├── order.ts             ✅ OK
│   └── index.ts             📝 ATUALIZAR (remover pizzas/pedidos)
│
└── utils/
    └── fetchHelpers.ts      ✅ OK
```

---

## 🎯 COMANDOS RÁPIDOS

```bash
# 1. Criar estrutura
mkdir -p src/features/orders/{services,hooks,components}

# 2. Criar arquivos vazios
touch src/features/orders/services/ordersService.ts
touch src/features/orders/services/index.ts
touch src/features/orders/hooks/useOrders.ts
touch src/features/orders/hooks/index.ts

# 3. Verificar imports antigos
grep -rn "pizzasService" src/
grep -rn "pedidosService" src/
grep -rn "createPedido" src/

# 4. Deletar código legado
rm -rf src/features/pizzas/
rm src/features/pedidos/services/pedidosService.ts

# 5. Build
npm run build

# 6. Commit
git add .
git commit -m "feat: complete orders service implementation"
git push origin feat/refactor-modern-api
```

---

## 💡 DICAS PARA IA

**Se estiver usando Cursor/Copilot**:

```
Tarefa: Criar ordersService.ts moderno

Contexto:
- Backend usa endpoint POST /orders
- Body: { type: 'DELIVERY'|'DINE_IN', addressId?: number, sessionId?: string, items: [{productId: string, quantity: number}] }
- Resposta: Order (interface em types/order.ts)

Regras:
- ❌ PROIBIDO usar 'any'
- ✅ Usar fetchWithAuth de utils/fetchHelpers
- ✅ Seguir padrão de productsService.ts
- ✅ Error handling com try/catch
- ✅ Toaster para feedback do usuário

Arquivo de referência: src/features/produtos/services/productsService.ts
Types: src/types/order.ts
```

---

**⏱️ Tempo Total**: 4-6 horas  
**📅 Prazo**: Completar hoje (28/12/2025)  
**🎯 Prioridade**: 🔴 MÁXIMA

**Status Final Esperado**: ✅ 100% Implementado
