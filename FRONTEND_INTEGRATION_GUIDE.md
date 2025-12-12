# 🍕 Pizza Express - Guia de Integração Frontend (Next.js)

Este documento detalha as funcionalidades implementadas no Backend Refatorado, cobrindo autenticação, regras de negócio, endpoints e sugestões de implementação para o Frontend em Next.js (App Router).

## 📋 Visão Geral do Sistema

O backend foi refatorado para suportar uma operação híbrida de **Delivery** e **Restaurante (Dine-in)**, com controle estrito de mesas e sessões.

### 🛠️ Stack Sugerida para o Frontend
- **Framework**: Next.js 14+ (App Router)
- **Data Fetching**: TanStack Query (React Query) ou SWR para estado do cliente; `fetch` nativo para Server Components.
- **Auth**: NextAuth.js (opcional) ou gerenciamento manual de JWT via Cookies/Context.
- **UI**: Tailwind CSS + Shadcn/UI (recomendado para cards e dashboards).

---

## 🔐 1. Autenticação e Permissões

O sistema utiliza **JWT (JSON Web Tokens)** e **RBAC (Role-Based Access Control)**.

### Roles Disponíveis
- `ADMIN`: Acesso total.
- `FUNCIONARIO`: Gerencia mesas, pedidos e entregas.
- `CLIENTE`: Faz pedidos (delivery), gerencia perfil e endereços.

### Endpoints Principais
- `POST /auth/login`: Retorna `{ access_token, user }`.
- `POST /auth/register`: Cria novo usuário (padrão: CLIENTE).
- `GET /auth/me`: Retorna dados do usuário logado.
- `GET /auth/google`: Inicia fluxo OAuth (Redireciona para callback).

### 💡 Dica Next.js (Middleware)
Utilize o `middleware.ts` do Next.js para proteger rotas baseadas no token armazenado em cookies.
```typescript
// Exemplo de lógica no middleware
if (request.nextUrl.pathname.startsWith('/admin') && user.role !== 'ADMIN') {
  return NextResponse.redirect(new URL('/unauthorized', request.url));
}
```

---

## 🪑 2. Gestão de Mesas e Sessões (Dine-in)

Esta é a funcionalidade central para o atendimento presencial.

### Fluxo de Negócio
1. **Mesas Físicas**: Identificadas por `number` (ex: Mesa 1, Mesa 2).
2. **Status da Mesa**:
   - 🟢 `AVAILABLE`: Livre.
   - 🔴 `OCCUPIED`: Cliente na mesa (Sessão Ativa).
   - 🟡 `RESERVED`: Reservada (futuro).
3. **Sessão (TableSession)**: É a "comanda" da mesa. Agrupa todos os pedidos enquanto o cliente está lá.

### Endpoints de Mesas
- `GET /tables`: Lista todas as mesas com status atual.
- `POST /tables`: Cria mesa (Admin).
- `POST /tables/:id/sessions`: **Abre uma sessão** (Muda status para OCCUPIED).
- `POST /tables/:id/bill`: **Fecha a conta** (Calcula total, fecha sessão, libera mesa).

### 🎨 Ideias de UI/UX para Mesas

#### Dashboard de Mesas (Visão do Garçom/Admin)
Imagine um grid de cards representando o salão.

*   **Card da Mesa (Componente)**:
    *   **Visual**: Quadrado ou Círculo.
    *   **Cor de Fundo**:
        *   Verde (Disponível)
        *   Vermelho (Ocupada)
    *   **Conteúdo**: Número da Mesa (Grande e centralizado).
    *   **Ação ao Clicar**:
        *   Se *Disponível*: Modal "Abrir Mesa para Cliente?".
        *   Se *Ocupada*: Navega para `/admin/mesas/[id]` (Detalhes da Sessão).

#### Detalhe da Sessão (A Comanda)
Ao entrar em uma mesa ocupada:
1.  **Header**: "Mesa #5 - Ocupada há 45min".
2.  **Lista de Pedidos**: Timeline dos pedidos feitos (ex: "19:30 - 2x Coca-Cola", "19:45 - 1x Pizza Calabresa").
3.  **Botão "Adicionar Pedido"**: Abre modal de catálogo para lançar itens na mesa.
4.  **Rodapé Fixo**:
    *   Subtotal: R$ 150,00
    *   Botão **"Fechar Conta"**: Gera o resumo final e libera a mesa.

---

## 📦 3. Pedidos (Orders)

O sistema unifica pedidos de Delivery e Mesa, diferenciados pelo `type`.

### Tipos de Pedido
- `DELIVERY`: Exige `addressId`.
- `DINE_IN`: Exige `tableId` (e uma sessão ativa na mesa).

### Endpoints
- `POST /orders`: Cria pedido.
  - Payload Delivery: `{ type: 'DELIVERY', items: [...], addressId: 1 }`
  - Payload Mesa: `{ type: 'DINE_IN', items: [...], tableId: 'uuid...' }`
- `GET /orders`: Lista pedidos (Filtros por status, cliente).
- `PATCH /pedidos/:id/status`: Atualiza status (PENDENTE -> EM_PREPARO -> SAIU_ENTREGA -> ENTREGUE).

### 💡 Integração Frontend
- **Real-time**: Considere usar *Polling* (SWR/React Query com `refreshInterval`) ou WebSockets (se implementado) para atualizar o status do pedido na tela do cliente ("Cozinha", "Saiu para Entrega").

---

## 🍔 4. Catálogo (Produtos e Categorias)

- `GET /categories`: Lista categorias (Pizzas, Bebidas, Sobremesas).
- `GET /products`: Lista produtos (com filtro de categoria).
- `GET /products/:id`: Detalhes (Ingredientes, Preço).

### UI Sugerida
- **Menu Digital**: Carrossel de categorias no topo. Lista de cards de produtos abaixo.
- **Modal de Produto**: Foto, descrição, seletor de quantidade e botão "Adicionar".

---

## 💳 5. Pagamentos (Stripe)

Integração completa com Stripe Payment Intents.

- `POST /payments/create-intent`: Gera `client_secret` para o Frontend.
- **Frontend**: Deve usar `@stripe/react-stripe-js` para renderizar o formulário de cartão e confirmar o pagamento usando o `client_secret`.
- **Webhook**: O backend escuta o webhook do Stripe para confirmar o pedido automaticamente.

---

## 🚚 6. Entregadores e Rastreamento

- `POST /entregadores`: Cadastro de motoboys.
- `GET /entregadores`: Lista equipe.
- **Vínculo**: Ao mudar status para `SAIU_PARA_ENTREGA`, pode-se associar um entregador ao pedido.

---

## ✅ Cobertura de Testes (Backend)

O arquivo `test_crud_complete.js` valida integralmente:
1.  Fluxo de Login/Registro.
2.  Ciclo de vida da Mesa (Abrir -> Pedir -> Fechar).
3.  Ciclo de vida do Delivery (Pedir -> Endereço -> Pagamento).
4.  Integridade dos dados (Produtos, Categorias, Usuários).

Isso garante que a API está estável para o desenvolvimento do Frontend.

---

## 🚀 Próximos Passos para o Frontend

1.  **Configurar Cliente HTTP**: Criar instância do Axios ou Fetch Wrapper com interceptors para injetar o Token JWT automaticamente.
2.  **Tipagem**: Espelhar as interfaces DTO do backend (ex: `CreateOrderDto`, `TableSession`) em `src/types`.
3.  **Páginas Chave**:
    *   `/login` & `/register`
    *   `/menu` (Catálogo)
    *   `/perfil` (Meus Pedidos, Endereços)
    *   `/admin/dashboard` (Visão geral)
    *   `/admin/mesas` (Grid de mesas)
