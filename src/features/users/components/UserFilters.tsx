// src/features/users/components/UserFilters.tsx

"use client";

import { Box, HStack, Input, Text, Button } from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { Role } from "@/types/users";
import { UserFilters as UserFiltersType } from "../types/userManagement";

interface UserFiltersProps {
  filters: UserFiltersType;
  onFiltersChange: (filters: UserFiltersType) => void;
  onSearch: () => void;
}

/**
 * Componente de filtros para usuários
 * Permite filtrar por role e buscar por nome/email
 */
export const UserFilters = ({ filters, onFiltersChange, onSearch }: UserFiltersProps) => {
  const handleRoleChange = (role: string) => {
    const newFilters = {
      ...filters,
      role: role === "all" ? undefined : role as Role,
    };
    onFiltersChange(newFilters);
  };

  const handleSearchChange = (search: string) => {
    const newFilters = {
      ...filters,
      search: search || undefined,
    };
    onFiltersChange(newFilters);
  };

  return (
    <Box
      p={4}
      bg="background.secondary"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="background.tertiary"
    >
      <HStack gap={4} align="flex-end" flexWrap="wrap">
        <Box flex="1" minW="200px">
          <Text mb={2} fontSize="sm" fontWeight="medium">
            Buscar
          </Text>
          <Input
            placeholder="Nome ou email (mín. 3 caracteres)..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {filters.search && filters.search.length > 0 && filters.search.length < 3 && (
            <Text fontSize="xs" color="orange.500" mt={1}>
              Digite pelo menos 3 caracteres para buscar
            </Text>
          )}
        </Box>

        <Box minW="150px">
          <Text mb={2} fontSize="sm" fontWeight="medium">
            Função
          </Text>
          <select
            value={filters.role || "all"}
            onChange={(e) => handleRoleChange(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #E2E8F0",
              borderRadius: "6px",
              fontSize: "14px",
              backgroundColor: "white",
            }}
          >
            <option value="all">Todas</option>
            <option value={Role.CLIENTE}>Clientes</option>
            <option value={Role.FUNCIONARIO}>Funcionários</option>
            <option value={Role.ADMIN}>Administradores</option>
          </select>
        </Box>

        <Button
          onClick={onSearch}
          colorScheme="blue"
          variant="outline"
          disabled={Boolean(filters.search && filters.search.length > 0 && filters.search.length < 3)}
        >
          <FaFilter style={{ marginRight: "8px" }} />
          Filtrar
        </Button>
      </HStack>
    </Box>
  );
};