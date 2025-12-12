// Types para Produtos
export interface Produto {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  image?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProdutoData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
}

export interface UpdateProdutoData {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  active?: boolean;
}