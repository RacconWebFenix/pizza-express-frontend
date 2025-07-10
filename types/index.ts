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
  descricao:string;
  preco: number;
}

export interface CreatePizzaWithImageData extends CreatePizzaData {
  imagem: File;
}

// Types para upload de imagem
export interface UploadImageData {
  imagem: File;
}




// Types para Pedido
export interface Pedido {
  id: string;
  pizzas: string[];
  total: number;
  status: "preparando" | "entregue" | "cancelado";
  data: string;
  hora: string;
  userId?: string;
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
