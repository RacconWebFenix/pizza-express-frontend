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
    color: "orange.600",
    bgGradient: "linear(to-br, orange.600, blue.700)",
  },
  {
    label: "Pedidos Ativos",
    value: "8",
    helpText: "Em preparo",
    icon: FaShoppingCart,
    color: "blue.800",
    bgGradient: "linear(to-br, blue.800, blue.700)",
  },
  {
    label: "Clientes Ativos",
    value: "124",
    helpText: "+5 novos hoje",
    icon: FaUsers,
    color: "blue.700",
    bgGradient: "linear(to-br, blue.700, gray.700)",
  },
  {
    label: "Faturamento Hoje",
    value: 1847,
    helpText: "+8% desde ontem",
    icon: FaDollarSign,
    color: "green.600",
    bgGradient: "linear(to-br, green.600, orange.600)",
  },
];
