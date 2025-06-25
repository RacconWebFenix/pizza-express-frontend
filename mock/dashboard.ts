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
    color: "brand.red",
    bgGradient: "linear(to-br, brand.red, brand.yellow)",
  },
  {
    label: "Pedidos Ativos",
    value: "8",
    helpText: "Em preparo",
    icon: FaShoppingCart,
    color: "brand.green",
    bgGradient: "linear(to-br, brand.green, brand.beige)",
  },
  {
    label: "Clientes Ativos",
    value: "124",
    helpText: "+5 novos hoje",
    icon: FaUsers,
    color: "brand.blue",
    bgGradient: "linear(to-br, blue.400, blue.600)",
  },
  {
    label: "Faturamento Hoje",
    value: 1847,
    helpText: "+8% desde ontem",
    icon: FaDollarSign,
    color: "brand.brown",
    bgGradient: "linear(to-br, brand.brown, brand.cream)",
  },
];
