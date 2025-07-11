import { Pizza, CreatePizzaWithImageData } from "../types";
import { getAuthToken } from "./auth-service"; // Supondo que você tenha esta função

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getPizzas = async (): Promise<Pizza[]> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/pizzas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Erro ao buscar as pizzas.");
  return response.json();
};

const createPizzaFormData = (
  data: Partial<CreatePizzaWithImageData>
): FormData => {
  const formData = new FormData();
  if (data.nome) formData.append("nome", data.nome);
  if (data.descricao) formData.append("descricao", data.descricao);
  if (data.preco) formData.append("preco", String(data.preco));
  if (data.imagem) formData.append("image", data.imagem);
  return formData;
};

export const createPizza = async (
  data: CreatePizzaWithImageData
): Promise<Pizza> => {
  const token = getAuthToken();
  const formData = createPizzaFormData(data);
  const response = await fetch(`${API_URL}/pizzas`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const responseData = await response.json(); // Pega a resposta completa
  if (!response.ok)
    throw new Error(responseData.message || "Erro ao criar a pizza.");

  return responseData.data; // <-- CORREÇÃO: Retorne apenas a propriedade 'data'
};

export const updatePizza = async (
  id: string,
  data: Partial<CreatePizzaWithImageData>
): Promise<Pizza> => {
  const token = getAuthToken();
  const formData = createPizzaFormData(data);

  // Ajuste para usar PATCH, que é o método no seu controller
  const response = await fetch(`${API_URL}/pizzas/${id}`, {
    method: "PATCH", // <-- CORREÇÃO: Mude de PUT/POST para PATCH
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const responseData = await response.json(); // Pega a resposta completa
  if (!response.ok)
    throw new Error(responseData.message || "Erro ao atualizar a pizza.");

  return responseData.data; // <-- CORREÇÃO: Retorne apenas a propriedade 'data'
};

export const deletePizza = async (id: string): Promise<void> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/pizzas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Erro ao deletar a pizza.");
};
