/**
 * Configuração para dados mockados
 *
 * Este arquivo controla quando usar dados mockados vs dados reais da API
 */

// Verificar se deve usar dados mockados
export const USE_MOCK_DATA =
  process.env.NODE_ENV === "development" && !process.env.NEXT_PUBLIC_API_URL;

// Delays para simular comportamento real da API
export const MOCK_DELAYS = {
  FAST: 300, // Para busca rápida
  NORMAL: 500, // Para operações normais
  SLOW: 1000, // Para operações pesadas
} as const;

// Configurações específicas por feature
export const MOCK_CONFIG = {
  // Se true, sempre usa dados mockados independente do ambiente
  FORCE_MOCK_PIZZAS: false,
  FORCE_MOCK_PEDIDOS: false,
  FORCE_MOCK_DASHBOARD: false,
  FORCE_MOCK_USERS: false,

  // Configurações de comportamento
  SIMULATE_ERRORS: false, // Simular erros da API
  SIMULATE_SLOW_NETWORK: false, // Simular rede lenta
  ENABLE_MOCK_LOGS: true, // Logs para debugging
} as const;

// Helper para verificar se deve usar mock para uma feature específica
export const shouldUseMock = (feature: keyof typeof MOCK_CONFIG) => {
  if (feature.startsWith("FORCE_MOCK_")) {
    return MOCK_CONFIG[feature as keyof typeof MOCK_CONFIG];
  }
  return USE_MOCK_DATA;
};
