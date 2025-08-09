/**
 * Constantes específicas para o módulo do cardápio
 */

export const CARDAPIO_CONSTANTS = {
  MESSAGES: {
    EMPTY_MENU: "Nenhuma pizza encontrada no cardápio.",
    LOADING: "Carregando cardápio...",
    ERROR_LOADING: "Erro ao carregar pizzas. Tente novamente.",
  },
  LAYOUT: {
    BACKGROUND_COLOR: "yellow.200",
    MIN_HEIGHT: "100vh",
    PADDING: 8,
    MAX_WIDTH: "1200px",
    GAP: 8,
  },
  GRID: {
    COLUMNS: { base: 1, md: 2, lg: 3 },
    GAP: 6,
  },
} as const;
