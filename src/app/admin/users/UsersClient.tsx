"use client";

import { Box, VStack, Heading, HStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { AdminRoute } from "@/components/ProtectedRoute";
import { useUsers, UsersTable, UserFormModal, UserFiltersComponent } from "@/features/users";
import { PizzaButton } from "@/components/ui";

/**
 * Página de Gerenciamento de Usuários
 * Área administrativa completa para CRUD de usuários
 */
export default function AdminUsersPage() {
  const usersHook = useUsers();

  return (
    <AdminRoute>
      <Box p={{ base: 4, md: 8 }}>
        <VStack gap={6} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="center">
            <Heading size="lg">Gerenciar Usuários</Heading>
            <PizzaButton
              onClick={usersHook.handleCreate}
              icon={FaPlus}
            >
              Novo Usuário
            </PizzaButton>
          </HStack>

          {/* Filtros */}
          <UserFiltersComponent
            filters={usersHook.filters}
            onFiltersChange={usersHook.setFilters}
            onSearch={usersHook.fetchUsers}
          />

          {/* Tabela */}
          <UsersTable
            users={usersHook.users}
            isLoading={usersHook.isLoading}
            onEdit={usersHook.handleEdit}
            onDelete={usersHook.handleDelete}
          />

          {/* Modal de Formulário */}
          <UserFormModal
            isOpen={usersHook.isModalOpen}
            user={usersHook.selectedUser}
            onSubmit={(data) => {
              if (usersHook.selectedUser) {
                return usersHook.updateUser(usersHook.selectedUser.id, data);
              } else {
                return usersHook.createUser(data);
              }
            }}
            onClose={usersHook.onCloseModal}
            isLoading={usersHook.isLoading}
          />
        </VStack>
      </Box>
    </AdminRoute>
  );
}
