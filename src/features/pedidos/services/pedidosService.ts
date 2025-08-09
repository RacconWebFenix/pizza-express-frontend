import { Pedido, StatusPedido } from "@/types/pedidos";
import { getAuthToken } from "@/services/auth-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// DTO para a criação de um pedido
interface CreatePedidoPayload {
  clienteId: number;
  enderecoId: number;
  pizzasIds: number[];
}

/**
 * Busca todos os pedidos do backend.
 */
export const getPedidos = async (): Promise<Pedido[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/pedidos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Falha ao buscar os pedidos.");
  return response.json();
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
