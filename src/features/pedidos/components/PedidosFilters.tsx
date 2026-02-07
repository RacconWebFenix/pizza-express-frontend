"use client";

import { Box, Input, Flex, Button, HStack } from "@chakra-ui/react";
import { StatusPedido } from "@/types/pedidos";
import { X } from "lucide-react";

interface PedidosFiltersProps {
  statusFilters: StatusPedido[];
  clienteFilter: string;
  pedidoFilter: string;
  onStatusChange: (statuses: StatusPedido[]) => void;
  onClienteChange: (nome: string) => void;
  onPedidoChange: (numero: string) => void;
}

const statusConfig: Record<
  StatusPedido,
  { label: string; bgColor: string; borderColor: string; activeBgColor: string }
> = {
  PENDENTE: {
    label: "Pendente",
    bgColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    activeBgColor: "#fff3e0",
  },
  EM_PREPARO: {
    label: "Em Preparo",
    bgColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    activeBgColor: "#fff3e0",
  },
  A_CAMINHO: {
    label: "A Caminho",
    bgColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    activeBgColor: "#e3f2fd",
  },
  ENTREGUE: {
    label: "Entregue",
    bgColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    activeBgColor: "#e8f5e9",
  },
  CANCELADO: {
    label: "Cancelado",
    bgColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    activeBgColor: "#ffebee",
  },
};



export const PedidosFilters = ({
  statusFilters,
  clienteFilter,
  pedidoFilter,
  onStatusChange,
  onClienteChange,
  onPedidoChange,
}: PedidosFiltersProps) => {
  const handleStatusToggle = (status: StatusPedido) => {
    if (statusFilters.includes(status)) {
      onStatusChange(statusFilters.filter((s) => s !== status));
    } else {
      onStatusChange([...statusFilters, status]);
    }
  };

  const handleSelectAllStatuses = () => {
    onStatusChange(Object.values(StatusPedido));
  };

  const handleClearFilters = () => {
    onStatusChange([]);
    onClienteChange("");
    onPedidoChange("");
  };

  const hasActiveFilters = statusFilters.length > 0 || clienteFilter || pedidoFilter;

  return (
    <Box
      mb={6}
      p={4}
      bg="background.secondary"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="background.tertiary"
    >
      {/* Filtro por Status - Badges Selecionáveis */}
      <Box mb={4}>
        <label
          style={{
            fontSize: "0.875rem",
            color: "#757575",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          Status
        </label>
        <HStack gap={2} flexWrap="wrap">
          {Object.values(StatusPedido).map((status) => {
            const isSelected = statusFilters.includes(status);
            const config = statusConfig[status];
            return (
              <Button
                key={status}
                size="sm"
                onClick={() => handleStatusToggle(status)}
                bg={isSelected ? config.activeBgColor : config.bgColor}
                borderWidth="1px"
                borderColor={isSelected ? "brand.500" : config.borderColor}
                color={isSelected ? "brand.600" : "#424242"}
                _hover={{
                  borderColor: "brand.400",
                  bg: isSelected ? config.activeBgColor : "#fafafa",
                }}
                fontWeight={isSelected ? "600" : "500"}
                transition="all 0.2s"
              >
                {config.label}
              </Button>
            );
          })}
        </HStack>
        <HStack gap={2} mt={2}>
          <Button
            size="xs"
            variant="ghost"
            onClick={handleSelectAllStatuses}
            fontSize="0.75rem"
          >
            Selecionar Todos
          </Button>
          {statusFilters.length > 0 && (
            <Button
              size="xs"
              variant="ghost"
              onClick={() => onStatusChange([])}
              fontSize="0.75rem"
            >
              Remover Filtro Status
            </Button>
          )}
        </HStack>
      </Box>

      <Flex gap={4} flexWrap="wrap" align="flex-end">
        {/* Filtro por Número do Pedido */}
        <Box minW="120px">
          <label style={{ fontSize: "0.875rem", color: "#757575" }}>
            Pedido #
          </label>
          <Input
            placeholder="Nº do pedido"
            value={pedidoFilter}
            onChange={(e) => onPedidoChange(e.target.value)}
            mt={1}
            size="sm"
            type="number"
            bg="background.primary"
            borderColor="background.tertiary"
            color="text.primary"
            _placeholder={{ color: "text.secondary" }}
          />
        </Box>

        {/* Filtro por Nome do Cliente */}
        <Box flex={1} minW="200px">
          <label style={{ fontSize: "0.875rem", color: "#757575" }}>
            Cliente
          </label>
          <Input
            placeholder="Digite o nome do cliente..."
            value={clienteFilter}
            onChange={(e) => onClienteChange(e.target.value)}
            mt={1}
            size="sm"
            bg="background.primary"
            borderColor="background.tertiary"
            color="text.primary"
            _placeholder={{ color: "text.secondary" }}
          />
        </Box>

        {hasActiveFilters && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleClearFilters}
            colorScheme="brand"
          >
            <Flex align="center" gap={2}>
              <X size={16} />
              Limpar Tudo
            </Flex>
          </Button>
        )}
      </Flex>
    </Box>
  );
};
