/**
 * Constantes de validação
 * @version 1.0.0
 * @since 28/12/2025
 */

/**
 * Limites de tamanho de arquivo
 */
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
} as const;

/**
 * Tipos de arquivo aceitos
 */
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const;

/**
 * Tipos MIME aceitos para imagens
 */
export const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const;

/**
 * Extensões de arquivo aceitas
 */
export const ACCEPTED_IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
] as const;

/**
 * Constantes de validação de formulários
 */
export const VALIDATION_RULES = {
  PRODUCT_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },
  PRODUCT_DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500,
  },
  PRODUCT_PRICE: {
    MIN: 0.01,
    MAX: 999999.99,
  },
  ORDER_OBSERVATIONS: {
    MAX_LENGTH: 500,
  },
  ORDER_ITEM_QUANTITY: {
    MIN: 1,
    MAX: 99,
  },
} as const;

/**
 * Mensagens de erro padronizadas
 */
export const ERROR_MESSAGES = {
  REQUIRED: 'Campo obrigatório',
  INVALID_FORMAT: 'Formato inválido',
  FILE_TOO_LARGE: 'Arquivo muito grande',
  UNSUPPORTED_FILE_TYPE: 'Tipo de arquivo não suportado',
  NETWORK_ERROR: 'Erro de conexão',
  UNAUTHORIZED: 'Não autorizado',
  NOT_FOUND: 'Não encontrado',
  SERVER_ERROR: 'Erro interno do servidor',
} as const;