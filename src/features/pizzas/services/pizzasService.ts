import { CreatePizzaWithImageData, Pizza } from "@/types/pizzas";
import { getAuthToken } from "@/utils/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper para criar o cabeçalho de autorização (CORRIGIDO)
const getAuthHeaders = () => {
  // Inicializamos o objeto de cabeçalhos com o tipo explícito que o fetch espera.
  const headers: Record<string, string> = {
    // Podemos adicionar outros cabeçalhos padrão aqui se necessário,
    // por exemplo: 'Content-Type': 'application/json'
  };

  const token = getAuthToken();
  if (token) {
    // Se o token existir, adicionamos a propriedade Authorization.
    headers["Authorization"] = `Bearer ${token}`;
  }

  // O objeto retornado agora sempre será do tipo Record<string, string>,
  // mesmo que esteja vazio, o que satisfaz o TypeScript.
  return headers;
};

const createPizzaFormData = (
  data: Partial<CreatePizzaWithImageData>
): FormData => {
  const formData = new FormData();
  if (data.nome) formData.append("nome", data.nome);
  if (data.descricao) formData.append("descricao", data.descricao);
  if (data.preco !== undefined) formData.append("preco", String(data.preco));
  if (data.image) formData.append("image", data.image);
  return formData;
};

// --- FUNÇÕES USANDO O HELPER CORRIGIDO ---

export const getPizzas = async (): Promise<Pizza[]> => {
  const response = await fetch(`${API_URL}/pizzas`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Erro ao buscar as pizzas.");
  return response.json();
};

export const createPizza = async (
  data: CreatePizzaWithImageData
): Promise<Pizza> => {
  const formData = createPizzaFormData(data);
  const response = await fetch(`${API_URL}/pizzas/with-image`, {
    method: "POST",
    headers: getAuthHeaders(),
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
  const formData = createPizzaFormData(data);
  const response = await fetch(`${API_URL}/pizzas/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: formData,
  });

  const responseData = await response.json();
  if (!response.ok)
    throw new Error(responseData.message || "Erro ao atualizar a pizza.");
  return responseData.data;
};

export const deletePizza = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/pizzas/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.message || "Erro ao deletar a pizza.");
  }
};
