import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiError {
  message: string;
  statusCode: number;
}

export const getPizzas = async () => {
  const token = Cookies.get("authToken");

  if (!token) {
    window.location.href = "/access-denied";
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/pizzas`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        window.location.href = "/access-denied";
        return [];
      }
      const error: ApiError = await response.json();
      throw new Error(error.message || "Erro ao buscar pizzas");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao buscar pizzas:", error);
    throw error;
  }
};

export const getPizzaById = async (id: string) => {
  const token = Cookies.get("authToken");

  if (!token) {
    window.location.href = "/access-denied";
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/pizzas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        window.location.href = "/access-denied";
        return null;
      }
      const error: ApiError = await response.json();
      throw new Error(error.message || "Erro ao buscar pizza");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao buscar pizza:", error);
    throw error;
  }
};

export const createPizza = async (pizzaData: {
  nome: string;
  descricao: string;
  preco: number;
}) => {
  const token = Cookies.get("authToken");

  if (!token) {
    window.location.href = "/access-denied";
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/pizzas`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizzaData),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        window.location.href = "/access-denied";
        return null;
      }
      const error: ApiError = await response.json();
      throw new Error(error.message || "Erro ao criar pizza");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao criar pizza:", error);
    throw error;
  }
};

export const updatePizza = async (
  id: string,
  pizzaData: { nome?: string; descricao?: string; preco?: number }
) => {
  const token = Cookies.get("authToken");

  if (!token) {
    window.location.href = "/access-denied";
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/pizzas/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizzaData),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        window.location.href = "/access-denied";
        return null;
      }
      const error: ApiError = await response.json();
      throw new Error(error.message || "Erro ao atualizar pizza");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao atualizar pizza:", error);
    throw error;
  }
};

export const deletePizza = async (id: string) => {
  const token = Cookies.get("authToken");

  if (!token) {
    window.location.href = "/access-denied";
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/pizzas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        window.location.href = "/access-denied";
        return null;
      }
      const error: ApiError = await response.json();
      throw new Error(error.message || "Erro ao deletar pizza");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao deletar pizza:", error);
    throw error;
  }
};
