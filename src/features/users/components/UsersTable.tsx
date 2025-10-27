// src/features/users/components/UsersTable.tsx

"use client";

import { Box, Table, IconButton, Badge, Text, VStack } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaUser, FaUserTie, FaUserShield } from "react-icons/fa";
import { User } from "@/types/users";
import { PizzaLoading } from "@/components/ui";
import { Role } from "@/types/users";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

/**
 * Componente de tabela para exibir usuários
 * Segue o padrão visual do projeto com Chakra UI
 */
export const UsersTable = ({ users, isLoading, onEdit, onDelete }: UsersTableProps) => {
  // Função para renderizar badge do role
  const renderRoleBadge = (role: Role) => {
    const roleConfig = {
      [Role.CLIENTE]: {
        label: "Cliente",
        colorScheme: "green" as const,
        icon: FaUser,
      },
      [Role.FUNCIONARIO]: {
        label: "Funcionário",
        colorScheme: "blue" as const,
        icon: FaUserTie,
      },
      [Role.ADMIN]: {
        label: "Administrador",
        colorScheme: "red" as const,
        icon: FaUserShield,
      },
    };

    const config = roleConfig[role];
    const IconComponent = config.icon;

    return (
      <Badge colorScheme={config.colorScheme} variant="subtle" px={2} py={1}>
        <IconComponent style={{ display: "inline", marginRight: "4px" }} />
        {config.label}
      </Badge>
    );
  };

  if (isLoading) {
    return <PizzaLoading message="Carregando usuários..." />;
  }

  if (users.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="text.secondary">Nenhum usuário encontrado.</Text>
      </Box>
    );
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="background.secondary"
      borderColor="background.tertiary"
    >
      <Table.Root size="md" variant="outline">
        <Table.Header bg="background.primary">
          <Table.Row>
            <Table.ColumnHeader>Nome</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Telefone</Table.ColumnHeader>
            <Table.ColumnHeader>Função</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center" width="120px">
              Ações
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell fontWeight="medium">{user.nome}</Table.Cell>
              <Table.Cell color="text.secondary">{user.email}</Table.Cell>
              <Table.Cell>{user.telefone}</Table.Cell>
              <Table.Cell>{renderRoleBadge(user.role)}</Table.Cell>
              <Table.Cell textAlign="center">
                <VStack gap={1}>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    aria-label="Editar usuário"
                    onClick={() => onEdit(user)}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    aria-label="Remover usuário"
                    onClick={() => onDelete(user.id)}
                  >
                    <FaTrash />
                  </IconButton>
                </VStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};