/**
 * Constantes específicas para o módulo do dashboard
 */

export const DASHBOARD_CONSTANTS = {
  TITLES: {
    MAIN: "Dashboard Pizza Express",
    STATS: "Estatísticas Gerais",
    QUICK_ACTIONS: "Ações Rápidas",
    CREATE_PIZZA: "Criar Nova Pizza",
  },
  MESSAGES: {
    WELCOME: "Bem-vindo ao painel de controle",
    NO_STATS: "Nenhuma estatística disponível",
    PIZZA_CREATED: "Pizza criada com sucesso!",
  },
  LAYOUT: {
    BACKGROUND_COLOR: "yellow.200",
    MIN_HEIGHT: "100vh",
    PADDING: 8,
    MAX_WIDTH: "1200px",
    GAP: 8,
  },
  GRID: {
    STATS_COLUMNS: { base: 1, md: 2, lg: 4 },
    ACTIONS_COLUMNS: { base: 1, md: 2 },
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
