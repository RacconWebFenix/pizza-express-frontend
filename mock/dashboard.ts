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
    color: "orange.500",
    bgGradient: "linear(to-br, orange.500, blue.500)",
  },
  {
    label: "Pedidos Ativos",
    value: "8",
    helpText: "Em preparo",
    icon: FaShoppingCart,
    color: "blue.600",
    bgGradient: "linear(to-br, blue.600, blue.500)",
  },
  {
    label: "Clientes Ativos",
    value: "124",
    helpText: "+5 novos hoje",
    icon: FaUsers,
    color: "blue.500",
    bgGradient: "linear(to-br, blue.500, gray.600)",
  },
  {
    label: "Faturamento Hoje",
    value: 1847,
    helpText: "+8% desde ontem",
    icon: FaDollarSign,
    color: "green.500",
    bgGradient: "linear(to-br, green.500, orange.500)",
  },
];
