import { Produto, CreateProdutoData, UpdateProdutoData } from '@/types/produto';
import { getAuthToken } from '@/utils/cookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Listar todos os produtos
export const getProdutos = async (): Promise<Produto[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/products`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar produtos' }));
    throw new Error(errorData.message || 'Erro ao buscar produtos');
  }

  return response.json();
};

// Buscar produto por ID
export const getProdutoById = async (id: string): Promise<Produto> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar produto' }));
    throw new Error(errorData.message || 'Erro ao buscar produto');
  }

  return response.json();
};

// Criar novo produto
export const createProduto = async (data: CreateProdutoData): Promise<Produto> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao criar produto' }));
    throw new Error(errorData.message || 'Erro ao criar produto');
  }

  return response.json();
};

// Atualizar produto
export const updateProduto = async (id: string, data: UpdateProdutoData): Promise<Produto> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao atualizar produto' }));
    throw new Error(errorData.message || 'Erro ao atualizar produto');
  }

  return response.json();
};

// Deletar produto
export const deleteProduto = async (id: string): Promise<void> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao deletar produto' }));
    throw new Error(errorData.message || 'Erro ao deletar produto');
  }
};