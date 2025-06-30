# Módulo Cardápio - Clean Code

Este módulo foi refatorado seguindo princípios de Clean Code e arquitetura limpa.

## Estrutura de Componentes

```
cardapio/
├── index.ts                 # Barrel export
├── CardapioContainer.tsx    # Container principal (lógica de estado)
├── CardapioContent.tsx      # Componente de apresentação
├── CardapioGrid.tsx         # Grid de pizzas
├── CardapioHeader.tsx       # Cabeçalho do cardápio
├── CardapioFooter.tsx       # Rodapé com ações
├── CardapioLoading.tsx      # Estado de carregamento
├── CardapioError.tsx        # Estado de erro
└── PizzaCard.tsx           # Card individual de pizza
```

## Hooks Customizados

```
hooks/
├── useCardapio.ts          # Hook principal com lógica de negócio
└── usePizzas.ts           # Hook para gerenciar dados das pizzas
```

## Constantes

```
constants/
└── cardapio.ts            # Constantes específicas do módulo
```

## Princípios Aplicados

### 1. Single Responsibility Principle (SRP)
- Cada componente tem uma responsabilidade específica
- `CardapioContainer`: Gerencia estado e lógica
- `CardapioContent`: Apresentação visual
- `CardapioGrid`: Exibição da grade de pizzas

### 2. Dependency Inversion Principle (DIP)
- Componentes dependem de abstrações (interfaces)
- Hooks encapsulam lógica de negócio

### 3. Open/Closed Principle (OCP)
- Componentes são abertos para extensão via props
- Fechados para modificação da estrutura básica

### 4. Separation of Concerns
- Lógica de estado separada da apresentação
- Constantes centralizadas
- Tipagem consistente

## Benefícios da Refatoração

1. **Manutenibilidade**: Código mais fácil de manter e modificar
2. **Testabilidade**: Componentes isolados facilitam testes unitários
3. **Reutilização**: Componentes podem ser reutilizados em outros contextos
4. **Legibilidade**: Código mais claro e autodocumentado
5. **Escalabilidade**: Estrutura preparada para crescimento

## Como Usar

```tsx
// Importação simples via barrel export
import { CardapioContainer } from '../../components/cardapio';

// Na página
export default function CardapioPage() {
  return <CardapioContainer />;
}
```

## Próximos Passos

1. Implementar testes unitários para cada componente
2. Adicionar tratamento de erro mais robusto
3. Implementar cache de dados
4. Adicionar filtros e busca
5. Implementar paginação para listas grandes
