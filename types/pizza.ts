// Types para Pizza
export interface Pizza {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl?: string; // URL da imagem vinda do backend
  imagem?: string; // Campo opcional para o nome do arquivo
  createdAt: string;
  updatedAt: string;
}

export interface CreatePizzaData {
  nome: string;
  descricao: string;
  preco: number;
}

export interface CreatePizzaWithImageData extends CreatePizzaData {
  imagem: File;
}
