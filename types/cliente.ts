// Types para Cliente baseados na documentação das rotas
export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco?: string; // Opcional porque não é enviado no cadastro
  createdAt?: string;
  updatedAt?: string;
}

// Types para criação de cliente (sem endereço)
export interface CreateClienteData {
  nome: string;
  email: string;
  telefone: string;
}

// Types para atualização de cliente (com endereço opcional)
export interface UpdateClienteData {
  nome: string;
  email: string;
  telefone: string;
  endereco?: string;
}

// Types para resposta da API
export interface ClienteResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  createdAt: string;
}

export interface UpdateClienteResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  updatedAt: string;
}

export interface DeleteClienteResponse {
  message: string;
}
