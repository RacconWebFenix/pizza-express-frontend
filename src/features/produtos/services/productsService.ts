/**
 * Service para gerenciar produtos
 * @version 1.0.0
 * @since 28/12/2025
 */

import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product";
import { fetchWithFormData, fetchWithAuth } from "@/utils/fetchHelpers";

/**
 * Erro customizado para operações de produtos
 */
class ProductServiceError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = "ProductServiceError";
  }
}

/**
 * Cria FormData a partir de CreateProductDto ou UpdateProductDto
 */
const createFormData = (
  data: Partial<CreateProductDto | UpdateProductDto>
): FormData => {
  const formData = new FormData();

  // Adiciona campos de texto
  if (data.name !== undefined) formData.append("name", data.name);
  if (data.description !== undefined)
    formData.append("description", data.description);
  if (data.categoryId !== undefined)
    formData.append("categoryId", data.categoryId);

  // Adiciona campo active apenas se existir (UpdateProductDto)
  if ("active" in data && data.active !== undefined) {
    formData.append("active", data.active.toString());
  }

  // Converte preço para string se for número
  if (data.price !== undefined) {
    const priceStr =
      typeof data.price === "number" ? data.price.toString() : data.price;
    formData.append("price", priceStr);
  }

  // Adiciona arquivo de imagem
  if (data.image) {
    formData.append("image", data.image);
  }

  return formData;
};

/**
 * Busca todos os produtos
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    return await fetchWithAuth("/products");
  } catch (error) {
    if (error instanceof Error && error.name === "FetchError") {
      throw error;
    }
    throw new ProductServiceError("Erro ao buscar produtos", 500, error);
  }
};

/**
 * Busca produtos por categoria
 */
export const getProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  try {
    return await fetchWithAuth(
      `/products?categoryId=${encodeURIComponent(categoryId)}`
    );
  } catch (error) {
    if (error instanceof Error && error.name === "FetchError") {
      throw error;
    }
    throw new ProductServiceError(
      "Erro ao buscar produtos por categoria",
      500,
      error
    );
  }
};

/**
 * Busca produto por ID
 */
export const getProductById = async (productId: string): Promise<Product> => {
  try {
    return await fetchWithAuth(`/products/${productId}`);
  } catch (error) {
    if (error instanceof Error && error.name === "FetchError") {
      throw error;
    }
    throw new ProductServiceError("Erro ao buscar produto", 500, error);
  }
};

/**
 * Cria um novo produto
 */
export const createProduct = async (
  data: CreateProductDto
): Promise<Product> => {
  try {
    const formData = createFormData(data);
    return await fetchWithFormData("/products", formData, "POST");
  } catch (error) {
    if (error instanceof ProductServiceError) {
      throw error;
    }
    throw new ProductServiceError("Erro ao criar produto", 500, error);
  }
};

/**
 * Atualiza um produto
 */
export const updateProduct = async (
  productId: string,
  data: UpdateProductDto
): Promise<Product> => {
  try {
    const formData = createFormData(data);
    return await fetchWithFormData(`/products/${productId}`, formData, "PATCH");
  } catch (error) {
    if (error instanceof ProductServiceError) {
      throw error;
    }
    throw new ProductServiceError("Erro ao atualizar produto", 500, error);
  }
};

/**
 * Deleta um produto
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await fetchWithAuth(`/products/${productId}`, { method: "DELETE" });
  } catch (error) {
    if (error instanceof Error && error.name === "FetchError") {
      throw error;
    }
    throw new ProductServiceError("Erro ao deletar produto", 500, error);
  }
};

/**
 * Busca produtos com filtros
 */
export const getProductsWithFilters = async (filters?: {
  categoryId?: string;
  active?: boolean;
  search?: string;
}): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ""}`;

    return await fetchWithAuth(endpoint);
  } catch (error) {
    if (error instanceof Error && error.name === "FetchError") {
      throw error;
    }
    throw new ProductServiceError(
      "Erro ao buscar produtos com filtros",
      500,
      error
    );
  }
};

/**
 * Exporta todas as funções do service
 */
export const productsService = {
  getAll: getAllProducts,
  getByCategory: getProductsByCategory,
  getById: getProductById,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
  getWithFilters: getProductsWithFilters,
};

export default productsService;
