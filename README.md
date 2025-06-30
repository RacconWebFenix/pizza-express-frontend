# 🍕 Pizza Express Frontend

Um sistema moderno de pizzaria desenvolvido com **Next.js 15**, **TypeScript**, **Chakra UI v3** e autenticação completa.

## ✨ Funcionalidades Implementadas

### 🔐 **Sistema de Autenticação**
- Login e logout seguros
- Contexto de autenticação global
- Proteção de rotas automática
- Gerenciamento de tokens JWT

### 🎨 **Interface Moderna**
- **Layout Principal**: Header com navegação responsiva
- **Tema Personalizado**: Cores temáticas da pizzaria
- **Animações**: Transições suaves com Framer Motion
- **Componentes Reutilizáveis**: NavItem, MainLayout, Header

### 📱 **Páginas Principais**
- **Dashboard**: `/app` - Visão geral com estatísticas
- **Cardápio**: `/cardapio` - Listagem completa de pizzas
- **Pedidos**: `/pedidos` - Histórico e status dos pedidos
- **Dashboard Admin**: `/dashboard` - Painel administrativo

### 🛠️ **Funcionalidades do Sistema**
- **Cardápio Dinâmico**: Carregamento de pizzas via API
- **Gestão de Pedidos**: Visualização e acompanhamento
- **Estatísticas**: Dashboard com métricas em tempo real
- **Navegação Intuitiva**: Menu responsivo com indicação de página ativa

## 🚀 **Tecnologias Utilizadas**

- **Next.js 15** com App Router
- **TypeScript** para tipagem estática
- **Chakra UI v3** para componentes
- **Framer Motion** para animações
- **React Icons** para ícones
- **JWT** para autenticação
- **Jest + React Testing Library** para testes

## 📂 **Estrutura do Projeto**

```
app/
├── (app)/                 # Rotas protegidas
│   ├── layout.tsx         # Layout com autenticação
│   ├── page.tsx           # Dashboard principal
│   ├── cardapio/
│   │   └── page.tsx       # Página do cardápio
│   ├── dashboard/
│   │   └── page.tsx       # Dashboard administrativo
│   └── pedidos/
│       └── page.tsx       # Página de pedidos
├── (auth)/                # Rotas de autenticação
│   ├── login/
│   └── access-denied/
├── layout.tsx             # Layout raiz
├── page.tsx              # Página inicial
└── provider.tsx          # Providers globais

components/
├── auth/
│   └── auth-context.tsx   # Contexto de autenticação
├── layout/
│   ├── Header.tsx         # Cabeçalho com navegação
│   ├── MainLayout.tsx     # Layout principal
│   └── NavItem.tsx        # Item de navegação
└── TestChakra.tsx         # Teste do Chakra UI

services/
└── pizza-service.ts       # Serviços da API

theme/
└── theme.ts              # Configuração do tema
```

## 🎯 **Próximos Passos Sugeridos**

### **1. Sistema de Carrinho de Compras**
- Adicionar pizzas ao carrinho
- Gerenciar quantidades
- Finalizar pedidos

### **2. Funcionalidades Admin**
- CRUD completo de pizzas
- Gerenciamento de usuários
- Relatórios de vendas

### **3. Melhorias na UX**
- Notificações toast
- Loading states avançados
- Filtros no cardápio
- Busca de pizzas

### **4. Integrações**
- Sistema de pagamento
- Notificações push
- Chat de atendimento

### **5. Otimizações**
- Cache de dados
- Lazy loading
- SEO otimizado
- PWA

## 🛠️ **Como Usar**

### **Instalação**
```bash
npm install
```

### **Desenvolvimento**
```bash
npm run dev
```

### **Testes**
```bash
npm test
```

### **Build**
```bash
npm run build
```

## 🔧 **Configuração**

### **Variáveis de Ambiente**
Crie um arquivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### **Backend**
O projeto requer o [Pizza Express Backend](https://github.com/RacconWebFenix/pizza-express-backend) rodando.

## 📋 **Scripts Disponíveis**

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Linting do código
- `npm test` - Execução dos testes

## 🎨 **Paleta de Cores**

- **Vermelho**: `#D92B2B` (Tomate, Pepperoni)
- **Verde**: `#228B22` (Manjericão, Pesto)
- **Amarelo**: `#FFC72C` (Queijo)
- **Bege**: `#F5DEB3` (Massa, Crosta)
- **Marrom**: `#A0522D` (Forno a lenha)
- **Carvão**: `#36454F` (Acentos escuros)
- **Creme**: `#FFFDD0` (Fundo claro)

## 📸 **Funcionalidades Implementadas**

### ✅ **Concluído**
- [x] Sistema de autenticação completo
- [x] Layout principal com navegação
- [x] Página de dashboard com estatísticas
- [x] Cardápio dinâmico com carregamento da API
- [x] Página de pedidos com histórico
- [x] Dashboard administrativo
- [x] Tema personalizado do Chakra UI
- [x] Animações e transições
- [x] Proteção de rotas
- [x] Componentes reutilizáveis

### 🔄 **Em Desenvolvimento**
- [ ] Sistema de carrinho
- [ ] CRUD de pizzas
- [ ] Notificações
- [ ] Filtros e busca

### 📋 **Planejado**
- [ ] Sistema de pagamento
- [ ] Relatórios avançados
- [ ] Chat de atendimento
- [ ] Aplicativo mobile (PWA)

---

**Desenvolvido com ❤️ para a melhor experiência em pizzarias!** 🍕
