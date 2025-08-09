// Types para cadastro/registro de usuario (APENAS POST)
// Baseado na documentação: O endereço NÃO deve ser enviado na rota de cadastro

// Payload para criação de usuario (sem endereço)
export interface CreateUsuarioData {
  nome: string;
  email: string;
  telefone: string;
}

// Resposta da API após cadastro
export interface CreateUsuarioResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  createdAt: string;
}
