/**
 * Constantes específicas para o módulo de pedidos
 */

export const PEDIDOS_CONSTANTS = {
  TITLES: {
    MAIN: "Gestão de Pedidos",
    FILTERS: "Filtrar por Status",
    STATS: "Resumo dos Pedidos",
  },
  MESSAGES: {
    NO_ORDERS: "Nenhum pedido encontrado",
    LOADING: "Carregando pedidos...",
    ERROR_LOADING: "Erro ao carregar pedidos. Tente novamente.",
  },
  LAYOUT: {
    BACKGROUND_COLOR: "yellow.200",
    MIN_HEIGHT: "100vh",
    PADDING: 8,
    MAX_WIDTH: "1200px",
    GAP: 8,
  },
  FILTERS: [
    { value: "todos", label: "Todos os Pedidos" },
    { value: "preparando", label: "Preparando" },
    { value: "entregue", label: "Entregues" },
    { value: "cancelado", label: "Cancelados" },
  ],
  GRID: {
    COLUMNS: { base: 1, lg: 2 },
    GAP: 6,
  },
  ANIMATIONS: {
    FADE_IN: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    },
    STAGGER_CHILDREN: {
      animate: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
  },
} as const;
