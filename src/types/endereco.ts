// src/types/endereco.ts

export interface Endereco {
  id: number;
  cep: string;
  tipo: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string | null;
  cidade: string;
  estado: string;
  principal: boolean;
}
