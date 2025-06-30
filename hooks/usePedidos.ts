import { useState, useCallback, useMemo } from "react";
import { FaClock, FaCheckCircle, FaTimes } from "react-icons/fa";
import { mockPedidos } from "../mock";
import type { Pedido } from "../types/pedidos";

export interface StatusConfig {
  color: string;
  icon: React.ElementType;
  label: string;
  bgColor: string;
  borderColor: string;
  badgeScheme: string;
}

interface UsePedidosReturn {
  pedidos: Pedido[];
  selectedStatus: string;
  getStatusConfig: (status: string) => StatusConfig;
  handleStatusFilter: (status: string) => void;
  filteredPedidos: Pedido[];
}

export const usePedidos = (): UsePedidosReturn => {
  const [selectedStatus, setSelectedStatus] = useState("todos");

  // Converte os dados do mock para o formato esperado
  const pedidos = useMemo(() => {
    return mockPedidos.map((pedido) => ({
      id: pedido.id,
      cliente: `Cliente ${pedido.id}`, // Dados mock
      pizzas: pedido.pizzas,
      total: pedido.total,
      status: pedido.status,
      horario: `${pedido.data} ${pedido.hora}`,
    }));
  }, []);

  const getStatusConfig = useCallback((status: string): StatusConfig => {
    switch (status) {
      case "preparando":
        return {
          color: "brand.warning",
          icon: FaClock,
          label: "Preparando",
          bgColor: "brand.cream",
          borderColor: "brand.pizza",
          badgeScheme: "yellow",
        };
      case "entregue":
        return {
          color: "brand.success",
          icon: FaCheckCircle,
          label: "Entregue",
          bgColor: "#F0FDF4",
          borderColor: "brand.fresh",
          badgeScheme: "green",
        };
      case "cancelado":
        return {
          color: "brand.error",
          icon: FaTimes,
          label: "Cancelado",
          bgColor: "#FEF2F2",
          borderColor: "brand.error",
          badgeScheme: "red",
        };
      default:
        return {
          color: "gray.500",
          icon: FaClock,
          label: "Desconhecido",
          bgColor: "gray.50",
          borderColor: "gray.200",
          badgeScheme: "gray",
        };
    }
  }, []);

  const handleStatusFilter = useCallback((status: string) => {
    setSelectedStatus(status);
  }, []);

  const filteredPedidos = useMemo(() => {
    if (selectedStatus === "todos") {
      return pedidos;
    }
    return pedidos.filter((pedido) => pedido.status === selectedStatus);
  }, [selectedStatus, pedidos]);

  return {
    pedidos,
    selectedStatus,
    getStatusConfig,
    handleStatusFilter,
    filteredPedidos,
  };
};
