// URLs da API
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  PIZZAS: "/pizzas",
  AUTH: {
    LOGIN: "/auth/login",
    ME: "/me",
    LOGOUT: "/auth/logout",
  },
  PEDIDOS: "/pedidos",
  USERS: "/users",
} as const;

// Rotas da aplicação
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  WELCOME: "/welcome",
  ACCESS_DENIED: "/access-denied",
  APP: {
    DASHBOARD: "/app",
    CARDAPIO: "/cardapio",
    PEDIDOS: "/pedidos",
    ADMIN_DASHBOARD: "/dashboard",
  },
} as const;

// Configurações de autenticação
export const AUTH_CONFIG = {
  TOKEN_KEY: "authToken",
  TOKEN_EXPIRY_DAYS: 1,
  COOKIE_OPTIONS: {
    path: "/",
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
  },
} as const;

// Configurações de UI
export const UI_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 50,
  },
  ANIMATION: {
    DURATION: 0.5,
    DELAY_STEP: 0.1,
  },
  BREAKPOINTS: {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
  },
} as const;

// Status de pedidos
export const PEDIDO_STATUS = {
  PREPARANDO: "preparando",
  ENTREGUE: "entregue",
  CANCELADO: "cancelado",
} as const;

// Mensagens de erro padrão
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Erro de conexão. Verifique sua internet.",
  UNAUTHORIZED: "Sessão expirada. Faça login novamente.",
  FORBIDDEN: "Você não tem permissão para esta ação.",
  NOT_FOUND: "Recurso não encontrado.",
  SERVER_ERROR: "Erro interno do servidor. Tente novamente.",
  VALIDATION_ERROR: "Dados inválidos. Verifique os campos.",
} as const;
