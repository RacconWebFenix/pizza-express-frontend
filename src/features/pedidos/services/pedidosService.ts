import { Pedido, StatusPedido } from "@/types/pedidos";
import { getAuthToken } from "@/utils/cookies";
import { API_BASE_URL } from "@/config/api";

const API_URL = API_BASE_URL;

// DTO para a criação de um pedido
interface CreatePedidoPayload {
  clienteId: number;
  enderecoId: number;
  pizzasIds: number[];
  paymentIntentId?: string; // Adicionar ID do pagamento
}

/**
 * Busca os pedidos do usuário logado.
 */
export const getMeusPedidos = async (): Promise<Pedido[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/pedidos/meus-pedidos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Falha ao buscar seus pedidos.");
  const result = await response.json();

  // A API pode retornar tanto um array quanto um objeto único
  // Vamos normalizar para sempre retornar um array
  const data = result.data || result;
  return Array.isArray(data) ? data : [data];
};

/**
 * Busca todos os pedidos do backend (para funcionários/admins).
 */
export const getPedidos = async (): Promise<Pedido[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/pedidos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Falha ao buscar os pedidos.");
  const result = await response.json();

  // A API pode retornar tanto um array quanto um objeto único
  // Vamos normalizar para sempre retornar um array
  const data = result.data || result;
  return Array.isArray(data) ? data : [data];
};

/**
 * Atualiza o status de um pedido específico.
 */
export const updatePedidoStatus = async (
  pedidoId: number,
  status: StatusPedido
): Promise<Pedido> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/pedidos/${pedidoId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const responseData = await response.json();
  if (!response.ok)
    throw new Error(responseData.message || "Falha ao atualizar o status.");
  return responseData.data;
};

/**
 * Cria um novo pedido no backend.
 */
export const createPedido = async (
  payload: CreatePedidoPayload
): Promise<Pedido> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const responseData = await response.json();
  if (!response.ok)
    throw new Error(responseData.message || "Falha ao criar o pedido.");
  return responseData.data;
};
