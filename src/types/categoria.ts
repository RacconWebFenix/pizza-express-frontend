// Types para Categorias
export interface Categoria {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoriaData {
  name: string;
  slug: string;
}

export interface UpdateCategoriaData {
  name?: string;
  slug?: string;
}