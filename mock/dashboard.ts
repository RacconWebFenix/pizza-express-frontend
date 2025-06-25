import {
  FaPizzaSlice,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

import { IconType } from "react-icons";

export interface DashboardStat {
  label: string;
  value: string | number;
  helpText: string;
  icon: IconType;
  color: string;
  bgGradient: string;
}

export const mockDashboardStats: DashboardStat[] = [
  {
    label: "Pizzas Vendidas Hoje",
    value: "47",
    helpText: "+12% desde ontem",
    icon: FaPizzaSlice,
    color: "brand.pizza",
    bgGradient: "linear(to-br, brand.pizza, brand.accent)",
  },
  {
    label: "Pedidos Ativos",
    value: "8",
    helpText: "Em preparo",
    icon: FaShoppingCart,
    color: "brand.primary",
    bgGradient: "linear(to-br, brand.primary, brand.accent)",
  },
  {
    label: "Clientes Ativos",
    value: "124",
    helpText: "+5 novos hoje",
    icon: FaUsers,
    color: "brand.accent",
    bgGradient: "linear(to-br, brand.accent, brand.secondary)",
  },
  {
    label: "Faturamento Hoje",
    value: 1847,
    helpText: "+8% desde ontem",
    icon: FaDollarSign,
    color: "brand.success",
    bgGradient: "linear(to-br, brand.success, brand.pizza)",
  },
];
