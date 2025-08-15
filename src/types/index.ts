// Types para upload de imagem
export interface UploadImageData {
  imagem: File;
}

// Types para Usuário
export interface User {
  userId: number;
  email: string;
  nome?: string;
  telefone?: string;
  endereco?: string;
}

// Types para Autenticação
export interface AuthResponse {
  access_token: string;
  user: User;
}

// Types para API Response
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Types para Componentes
export interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ComponentType;
}

export interface LayoutProps {
  children: React.ReactNode;
}

// Types para Dashboard
export interface DashboardStats {
  label: string;
  value: string;
  helpText: string;
  icon: React.ComponentType;
  color: string;
  bgGradient: string;
}

// Exporta todos os tipos relacionados a pizza
// export * from "./pizza"; // Removido porque o módulo não existe

// Exporta todos os tipos relacionados a pedidos
export * from "./pedidos";

// Exporta todos os tipos relacionados ao carrinho de compras
export * from "./cart";

// Exporta todos os tipos relacionados a usuarios

export * from "./pizzas";

// Exporta todos os tipos relacionados a pedidos
export * from "./pedidos";

// Exporta todos os tipos relacionados a usuarios e endereços

export * from "./endereco"; // <<< ADICIONADO
export * from "./entregador"; // <<< ADICIONADO
