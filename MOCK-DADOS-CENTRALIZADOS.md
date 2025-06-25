# 📦 Pasta Mock - Dados Mockados Centralizados

## ✅ **Status: IMPLEMENTADO COMPLETAMENTE**

A pasta `mock/` já foi criada e todos os dados mockados estão organizados de forma centralizada. Esta implementação segue as melhores práticas de desenvolvimento e permite fácil alternância entre dados mockados e dados reais da API.

## 📂 **Estrutura Atual da Pasta Mock**

```
mock/
├── config.ts          # Configurações para controle de mocks
├── dashboard.ts        # Dados do dashboard administrativo
├── pedidos.ts         # Dados de pedidos mockados
├── pizzas.ts          # Dados de pizzas mockadas
├── users.ts           # Dados de usuários mockados
└── index.ts           # Arquivo de exportação central
```

## 🎯 **Arquivos Implementados**

### 1. **`mock/index.ts`**
- ✅ Exporta todos os mocks de forma centralizada
- ✅ Re-exporta tipos para facilitar uso
- ✅ Ponto único de entrada para dados mockados

### 2. **`mock/config.ts`**
- ✅ Controla quando usar dados mockados vs reais
- ✅ Configurações de delay para simular rede
- ✅ Switches específicos por feature
- ✅ Helper `shouldUseMock()` para verificação

### 3. **`mock/pizzas.ts`**
- ✅ Array com 10+ pizzas mockadas
- ✅ Dados completos (nome, descrição, preço, categoria)
- ✅ Tipagem correta usando interface `Pizza`
- ✅ Dados realistas e variados

### 4. **`mock/pedidos.ts`**
- ✅ Pedidos com diferentes status
- ✅ Dados históricos simulados
- ✅ Interface `MockPedido` customizada
- ✅ Relacionamento com pizzas

### 5. **`mock/dashboard.ts`**
- ✅ Estatísticas para dashboard administrativo
- ✅ Métricas de vendas, produtos, usuários
- ✅ Configuração de cores e ícones
- ✅ Interface `DashboardStat` específica

### 6. **`mock/users.ts`**
- ✅ Usuários mockados para testes
- ✅ Dados de perfil completos
- ✅ Diferentes tipos de usuário
- ✅ Tipagem com interface `User`

## 🔧 **Como os Mocks são Utilizados**

### **Automático por Ambiente**
```typescript
// Em mock/config.ts
export const USE_MOCK_DATA = 
  process.env.NODE_ENV === "development" && 
  !process.env.NEXT_PUBLIC_API_URL;
```

### **No Service de Pizzas**
```typescript
// Em services/pizza-service.ts
import { mockPizzas } from "@/mock/pizzas";

export const getPizzas = async () => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPizzas), 500);
    });
  }
  // ... código da API real
};
```

### **Nas Páginas**
```typescript
// Em app/pedidos/page.tsx
import { mockPedidos } from "@/mock";

// Em app/dashboard/page.tsx  
import { mockDashboardStats } from "@/mock";
```

## 🚀 **Benefícios Implementados**

### **1. Desenvolvimento Offline**
- ✅ Aplicação funciona sem backend
- ✅ Dados realistas para testes
- ✅ Desenvolvimento independente de API

### **2. Facilidade de Uso**
- ✅ Import centralizado: `import { mockPizzas } from "@/mock"`
- ✅ Alternância automática entre mock/API
- ✅ Configuração simples via env vars

### **3. Manutenibilidade**
- ✅ Todos os mocks em um local
- ✅ Tipagem TypeScript correta
- ✅ Dados organizados por feature

### **4. Flexibilidade**
- ✅ Pode forçar mock por feature específica
- ✅ Configuração de delays simulados
- ✅ Possibilidade de simular erros

## 🔄 **Como Alternar entre Mock e API Real**

### **Para usar API real:**
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://pizza-express-backend.vercel.app
```

### **Para usar dados mockados:**
```bash
# .env.local
# Comentar ou remover a linha NEXT_PUBLIC_API_URL
# NEXT_PUBLIC_API_URL=
```

### **Forçar mock específico:**
```typescript
// Em mock/config.ts
export const MOCK_CONFIG = {
  FORCE_MOCK_PIZZAS: true,  // Sempre usar mock de pizzas
  // ...
}
```

## 📋 **Dados Disponíveis**

### **Pizzas (10 items)**
- Margherita, Pepperoni, Quattro Queijos
- Calabresa, Portuguesa, Frango com Catupiry
- Napolitana, Vegetariana, Mexicana, Bacon

### **Pedidos (5 items)**
- Diferentes status: preparando, entregue, cancelado
- Datas e horários variados
- Valores e pizzas realistas

### **Dashboard Stats (4 métricas)**
- Total de Vendas: R$ 15.847,50
- Produtos Ativos: 25 pizzas
- Clientes Ativos: 127 usuários
- Pedidos de Hoje: 8 pedidos

### **Usuários (3 items)**
- Perfis completos com dados pessoais
- Diferentes tipos de conta
- IDs e emails únicos

## 🎯 **Próximos Passos (Opcionais)**

### **Melhorias Futuras**
- [ ] Adicionar mais variedade de dados
- [ ] Implementar mock de relatórios
- [ ] Adicionar dados de categorias
- [ ] Mock para sistema de carrinho

### **Para Produção**
- [ ] Remover mocks ou manter apenas para testes
- [ ] Documentar APIs reais necessárias
- [ ] Implementar error handling robusto

## 🏆 **Conclusão**

✅ **IMPLEMENTAÇÃO COMPLETA**

A pasta `mock/` está totalmente implementada e funcional. Todos os dados mockados foram centralizados, organizados e tipados corretamente. O sistema permite desenvolvimento offline e transição suave para API real.

**Benefícios Alcançados:**
- ✅ Desenvolvimento independente de backend
- ✅ Dados realistas e organizados
- ✅ Alternância automática mock/API
- ✅ Tipagem TypeScript completa
- ✅ Configuração flexível e simples

---

**Data da Implementação**: 25 de junho de 2025  
**Status**: ✅ **COMPLETO E OPERACIONAL**  
**Desenvolvedor**: AI Assistant
