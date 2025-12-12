import { Categoria, CreateCategoriaData, UpdateCategoriaData } from '@/types/categoria';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Listar todas as categorias
export const getCategorias = async (): Promise<Categoria[]> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/categories`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar categorias' }));
    throw new Error(errorData.message || 'Erro ao buscar categorias');
  }

  return response.json();
};

// Buscar categoria por ID
export const getCategoriaById = async (id: string): Promise<Categoria> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar categoria' }));
    throw new Error(errorData.message || 'Erro ao buscar categoria');
  }

  return response.json();
};

// Criar nova categoria
export const createCategoria = async (data: CreateCategoriaData): Promise<Categoria> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao criar categoria' }));
    throw new Error(errorData.message || 'Erro ao criar categoria');
  }

  return response.json();
};

// Atualizar categoria
export const updateCategoria = async (id: string, data: UpdateCategoriaData): Promise<Categoria> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao atualizar categoria' }));
    throw new Error(errorData.message || 'Erro ao atualizar categoria');
  }

  return response.json();
};

// Deletar categoria
export const deleteCategoria = async (id: string): Promise<void> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao deletar categoria' }));
    throw new Error(errorData.message || 'Erro ao deletar categoria');
  }
};