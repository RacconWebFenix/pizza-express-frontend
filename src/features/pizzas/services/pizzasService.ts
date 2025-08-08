import { getAuthToken } from "@/services/auth-service"; // Assumindo que o auth-service ficará em /services por enquanto
import { CreatePizzaWithImageData, Pizza } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const createPizzaFormData = (
  data: Partial<CreatePizzaWithImageData>
): FormData => {
  const formData = new FormData();
  if (data.nome) formData.append("nome", data.nome);
  if (data.descricao) formData.append("descricao", data.descricao);
  if (data.preco !== undefined) formData.append("preco", String(data.preco));
  if (data.imagem) formData.append("image", data.imagem);
  return formData;
};

export const getPizzas = async (): Promise<Pizza[]> => {
  const response = await fetch(`${API_URL}/pizzas`);
  if (!response.ok) throw new Error("Erro ao buscar as pizzas.");
  return response.json();
};

export const createPizza = async (
  data: CreatePizzaWithImageData
): Promise<Pizza> => {
  const token = getAuthToken();
  const formData = createPizzaFormData(data);
  const response = await fetch(`${API_URL}/pizzas/with-image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const responseData = await response.json();
  if (!response.ok)
    throw new Error(responseData.message || "Erro ao criar a pizza.");
  return responseData.data;
};

export const updatePizza = async (
  id: number,
  data: Partial<CreatePizzaWithImageData>
): Promise<Pizza> => {
  const token = getAuthToken();
  const formData = createPizzaFormData(data);
  const response = await fetch(`${API_URL}/pizzas/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const responseData = await response.json();
  if (!response.ok)
    throw new Error(responseData.message || "Erro ao atualizar a pizza.");
  return responseData.data;
};

export const deletePizza = async (id: number): Promise<void> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/pizzas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.message || "Erro ao deletar a pizza.");
  }
};
