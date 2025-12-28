/**
 * Helpers reutilizáveis para fetch
 * @version 1.0.0
 * @since 28/12/2025
 */

import { getAuthToken } from './cookies';

/**
 * Erro customizado para requisições
 */
export class FetchError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

/**
 * Headers padrão para requisições JSON
 */
export const getJsonHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Headers para FormData (sem Content-Type)
 */
export const getFormDataHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: Record<string, string> = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Trata erros da API
 */
export const handleFetchError = async (response: Response): Promise<never> => {
  let message = 'Erro ao processar requisição';
  let details: unknown;

  try {
    const errorData = await response.json();
    message = errorData.message || message;
    details = errorData;
  } catch {
    // Se não conseguir parsear JSON, usa mensagem genérica
  }

  throw new FetchError(message, response.status, details);
};

/**
 * Faz requisição autenticada com JSON
 */
export const fetchWithAuth = async <T = unknown>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const token = getAuthToken();
  if (!token) {
    throw new FetchError('Usuário não autenticado', 401);
  }

  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}${url}`;
  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      ...getJsonHeaders(),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response.json();
};

/**
 * Faz requisição autenticada com FormData
 */
export const fetchWithFormData = async <T = unknown>(
  url: string,
  formData: FormData,
  method: 'POST' | 'PATCH' = 'POST'
): Promise<T> => {
  const token = getAuthToken();
  if (!token) {
    throw new FetchError('Usuário não autenticado', 401);
  }

  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}${url}`;
  const response = await fetch(fullUrl, {
    method,
    headers: getFormDataHeaders(),
    body: formData,
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response.json();
};