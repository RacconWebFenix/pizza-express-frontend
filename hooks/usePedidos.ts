import { useState, useEffect, useCallback, useMemo } from "react";
import { FaClock, FaCheckCircle, FaTimes } from "react-icons/fa";
import { getAuthToken } from "../services/auth-service";
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
  isLoading: boolean;
  error: string | null;
  getStatusConfig: (status: string) => StatusConfig;
  handleStatusFilter: (status: string) => void;
  filteredPedidos: Pedido[];
  refetch: () => Promise<void>;
}

export const usePedidos = (): UsePedidosReturn => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPedidos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if (!API_URL) {
        throw new Error("URL da API não configurada");
      }

      const token = getAuthToken();

      const response = await fetch(`${API_URL}/pedidos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setPedidos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar pedidos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
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
          bgColor: "brand.success",
          borderColor: "brand.success",
          badgeScheme: "green",
        };
      case "cancelado":
        return {
          color: "brand.danger",
          icon: FaTimes,
          label: "Cancelado",
          bgColor: "brand.danger",
          borderColor: "brand.danger",
          badgeScheme: "red",
        };
      default:
        return {
          color: "gray.500",
          icon: FaClock,
          label: "Pendente",
          bgColor: "gray.100",
          borderColor: "gray.300",
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
  }, [pedidos, selectedStatus]);

  return {
    pedidos,
    selectedStatus,
    isLoading,
    error,
    getStatusConfig,
    handleStatusFilter,
    filteredPedidos,
    refetch: fetchPedidos,
  };
};
