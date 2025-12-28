/**
 * Tipos para o sistema de produtos (substitui pizzas)
 * @version 1.0.0
 * @since 28/12/2025
 */

/**
 * Produto do catálogo
 */
export interface Product {
  id: string;              // UUID do backend
  name: string;
  description?: string;
  price: string;           // Decimal como string (backend)
  imageUrl?: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Categoria de produtos
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

/**
 * DTO para criação de produto
 */
export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;           // Será convertido para string no backend
  categoryId: string;
  image?: File;
}

/**
 * DTO para atualização de produto
 */
export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;          // Será convertido para string no backend
  categoryId?: string;
  active?: boolean;
  image?: File;
}

/**
 * Helper para converter Product.price (string) para number
 */
export const parseProductPrice = (priceString: string): number => {
  const price = parseFloat(priceString);
  if (isNaN(price)) {
    throw new Error(`Preço inválido: ${priceString}`);
  }
  return price;
};

/**
 * Helper para formatar número como price string
 */
export const formatProductPrice = (priceNumber: number): string => {
  return priceNumber.toFixed(2);
};

/**
 * Helper para validar se produto está ativo
 */
export const isProductActive = (product: Product): boolean => {
  return product.active;
};

/**
 * Helper para obter URL da imagem do produto
 */
export const getProductImageUrl = (product: Product): string | null => {
  return product.imageUrl || null;
};