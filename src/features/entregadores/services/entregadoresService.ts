import { Entregador } from '@/types/entregador';
import { getAuthToken } from '@/utils/cookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Listar todos os entregadores
export const getEntregadores = async (): Promise<Entregador[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/entregadores`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar entregadores' }));
    throw new Error(errorData.message || 'Erro ao buscar entregadores');
  }

  return response.json();
};

// Buscar entregador por ID
export const getEntregadorById = async (id: number): Promise<Entregador> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/entregadores/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar entregador' }));
    throw new Error(errorData.message || 'Erro ao buscar entregador');
  }

  return response.json();
};

// Criar novo entregador
export const createEntregador = async (data: { nome: string; telefone: string }): Promise<Entregador> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/entregadores`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao criar entregador' }));
    throw new Error(errorData.message || 'Erro ao criar entregador');
  }

  return response.json();
};

// Atualizar entregador
export const updateEntregador = async (id: number, data: { nome?: string; telefone?: string }): Promise<Entregador> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/entregadores/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao atualizar entregador' }));
    throw new Error(errorData.message || 'Erro ao atualizar entregador');
  }

  return response.json();
};

// Deletar entregador
export const deleteEntregador = async (id: number): Promise<void> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/entregadores/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao deletar entregador' }));
    throw new Error(errorData.message || 'Erro ao deletar entregador');
  }
};