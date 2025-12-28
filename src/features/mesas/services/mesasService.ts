import {
  Mesa,
  CreateMesaData,
  SessaoMesa,
  AdicionarPedidoMesaData,
} from "@/types/mesa";
import { Order } from "@/types/order";
import { getAuthToken } from "@/utils/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Tipos para dados da API
interface ApiPedidoItem {
  productId: string;
  quantity: number;
  price?: string;
  product?: {
    id: string;
    name: string;
    price?: string;
  };
}

interface ApiPedido {
  id: string | number;
  sessionId: string;
  items: ApiPedidoItem[];
  total: string | number;
  createdAt: string;
  observacoes?: string;
}

// Listar todas as mesas
export const getMesas = async (): Promise<Mesa[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/tables`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao buscar mesas" }));
    throw new Error(errorData.message || "Erro ao buscar mesas");
  }

  return response.json();
};

// Buscar mesa por ID
export const getMesaById = async (id: string): Promise<Mesa> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/tables/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao buscar mesa" }));
    throw new Error(errorData.message || "Erro ao buscar mesa");
  }

  return response.json();
};

// Criar nova mesa
export const createMesa = async (data: CreateMesaData): Promise<Mesa> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/tables`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao criar mesa" }));
    throw new Error(errorData.message || "Erro ao criar mesa");
  }

  return response.json();
};

// Abrir sessão da mesa
export const abrirSessaoMesa = async (mesaId: string): Promise<SessaoMesa> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/tables/${mesaId}/sessions/open`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao abrir sessão" }));
    throw new Error(errorData.message || "Erro ao abrir sessão da mesa");
  }

  return response.json();
};

// Ver sessão ativa da mesa
export const getSessaoAtiva = async (
  mesaId: string
): Promise<SessaoMesa | null> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/tables/${mesaId}/sessions/active`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null; // Não há sessão ativa
    }
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao buscar sessão ativa" }));
    throw new Error(errorData.message || "Erro ao buscar sessão ativa");
  }

  // Verificar se há conteúdo na resposta antes de tentar parsear JSON
  const contentLength = response.headers.get("content-length");
  if (contentLength === "0" || contentLength === null) {
    return null; // Resposta vazia significa não há sessão ativa
  }

  const sessaoData = await response.json();

  // Buscar pedidos relacionados à sessão
  try {
    const pedidosResponse = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (pedidosResponse.ok) {
      const pedidosData = await pedidosResponse.json();
      const todosPedidos = Array.isArray(pedidosData)
        ? pedidosData
        : pedidosData.data || [];

      // Filtrar pedidos que pertencem à sessão atual
      const pedidosSessao = todosPedidos.filter(
        (pedido: ApiPedido) => pedido.sessionId === sessaoData.id
      );

      // Transformar pedidos para o formato esperado pelo componente
      const pedidosMesa = pedidosSessao.map((pedido: ApiPedido) => ({
        id: pedido.id.toString(),
        itens: (pedido.items || []).map((item: ApiPedidoItem) => ({
          productId: item.productId,
          quantity: item.quantity,
          product: item.product
            ? {
                id: item.product.id,
                name: item.product.name,
                price: parseFloat(item.product.price || item.price || "0"),
              }
            : undefined,
        })),
        observacoes: pedido.observacoes || "",
        criadoEm: pedido.createdAt,
      }));

      // Calcular total da sessão baseado nos pedidos
      const totalSessao = pedidosSessao.reduce(
        (total: number, pedido: ApiPedido) =>
          total + parseFloat(pedido.total.toString() || "0"),
        0
      );

      return {
        ...sessaoData,
        criadoEm:
          sessaoData.openedAt || sessaoData.createdAt || sessaoData.criadoEm,
        pedidos: pedidosMesa,
        total: totalSessao,
      };
    }
  } catch (error) {
    console.warn("Erro ao buscar pedidos da sessão:", error);
  }

  // Retornar sessão sem pedidos se houver erro
  return {
    ...sessaoData,
    criadoEm:
      sessaoData.openedAt || sessaoData.createdAt || sessaoData.criadoEm,
    pedidos: [],
    total: 0,
  };
};

// Adicionar pedido à mesa
export const adicionarPedidoMesa = async (
  data: AdicionarPedidoMesaData
): Promise<Order> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao adicionar pedido" }));
    throw new Error(errorData.message || "Erro ao adicionar pedido à mesa");
  }

  return response.json();
};

// Fechar conta (billing)
export const fecharConta = async (mesaId: string): Promise<void> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/tables/${mesaId}/sessions/close`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao fechar conta" }));
    throw new Error(errorData.message || "Erro ao fechar conta da mesa");
  }

  // Não retorna dados, apenas confirma que a operação foi bem-sucedida
};
