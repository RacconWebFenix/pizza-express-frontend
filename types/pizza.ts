// Types para Pizza
export interface Pizza {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl?: string; // URL da imagem vinda do backend
  image?: string; // Campo opcional para o nome do arquivo
  createdAt: string;
  updatedAt: string;
}

export interface CreatePizzaData {
  nome: string;
  descricao: string;
  preco: number;
}

export interface CreatePizzaWithImageData extends CreatePizzaData {
  image: File | null; // Pode ser um arquivo ou null se não houver imagem
}
