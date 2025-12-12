import { Mesa, CreateMesaData, SessaoMesa, AdicionarPedidoMesaData, FecharContaData } from '@/types/mesa';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Listar todas as mesas
export const getMesas = async (): Promise<Mesa[]> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/tables`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar mesas' }));
    throw new Error(errorData.message || 'Erro ao buscar mesas');
  }

  return response.json();
};

// Buscar mesa por ID
export const getMesaById = async (id: string): Promise<Mesa> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/tables/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar mesa' }));
    throw new Error(errorData.message || 'Erro ao buscar mesa');
  }

  return response.json();
};

// Criar nova mesa
export const createMesa = async (data: CreateMesaData): Promise<Mesa> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/tables`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao criar mesa' }));
    throw new Error(errorData.message || 'Erro ao criar mesa');
  }

  return response.json();
};

// Abrir sessão da mesa
export const abrirSessaoMesa = async (mesaId: string): Promise<SessaoMesa> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/tables/${mesaId}/sessions/open`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao abrir sessão' }));
    throw new Error(errorData.message || 'Erro ao abrir sessão da mesa');
  }

  return response.json();
};

// Ver sessão ativa da mesa
export const getSessaoAtiva = async (mesaId: string): Promise<SessaoMesa | null> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/tables/${mesaId}/sessions/active`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null; // Não há sessão ativa
    }
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar sessão ativa' }));
    throw new Error(errorData.message || 'Erro ao buscar sessão ativa');
  }

  return response.json();
};

// Adicionar pedido à mesa
export const adicionarPedidoMesa = async (data: AdicionarPedidoMesaData): Promise<any> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao adicionar pedido' }));
    throw new Error(errorData.message || 'Erro ao adicionar pedido à mesa');
  }

  return response.json();
};

// Fechar conta (billing)
export const fecharConta = async (mesaId: string): Promise<any> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/tables/${mesaId}/sessions/close`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao fechar conta' }));
    throw new Error(errorData.message || 'Erro ao fechar conta da mesa');
  }

  return response.json();
};