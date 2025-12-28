// Types para Mesas e Sessões
export interface Mesa {
  id: string;
  number: number;
  status: MesaStatus;
  sessaoAtiva?: SessaoMesa;
  createdAt: string;
  updatedAt: string;
}

export enum MesaStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  RESERVED = "RESERVED",
}

export interface SessaoMesa {
  id: string;
  mesaId: string;
  pedidos: PedidoMesa[];
  total: number;
  status: "ATIVA" | "FECHADA";
  criadoEm: string;
  fechadoEm?: string;
}

export interface PedidoMesa {
  id: string;
  itens: ItemPedido[];
  observacoes?: string;
  criadoEm: string;
}

export interface ItemPedido {
  productId: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
  };
}

export interface CreateMesaData {
  number: number;
}

export interface AbrirSessaoData {
  mesaId: string;
}

export interface AdicionarPedidoMesaData {
  type: "DINE_IN";
  sessionId: string; // ✅ CORRETO (não tableId)
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  observacoes?: string; // ✅ CORRETO (português, não observations)
}

export interface FecharContaData {
  mesaId: string;
}
