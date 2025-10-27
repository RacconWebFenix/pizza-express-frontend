// src/features/users/hooks/useUsers.ts

"use client";

import { useState, useCallback, useEffect } from "react";
import { User } from "@/types/users";
import { toaster } from "@/components/ui/toaster";
import { getUsers, createUser, updateUser, deleteUser } from "../services/usersService";
import { UserFilters, UserCreationData } from "../types/userManagement";

export interface UseUsersReturn {
  // Estado
  users: User[];
  filters: UserFilters;
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  selectedUser: User | null;

  // Ações
  setFilters: (filters: UserFilters) => void;
  fetchUsers: () => Promise<void>;
  createUser: (data: UserCreationData) => Promise<void>;
  updateUser: (id: number, data: Partial<UserCreationData>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;

  // Handlers UI
  handleCreate: () => void;
  handleEdit: (user: User) => void;
  handleDelete: (id: number) => Promise<void>;
  onCloseModal: () => void;
}

/**
 * Hook principal para gerenciamento de usuários
 * Segue padrão dos outros hooks do projeto (usePizzas, useProfile)
 */
export const useUsers = (): UseUsersReturn => {
  // Estado da listagem
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<UserFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Buscar usuários (usado pelos filtros)
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Se temos busca com menos de 3 caracteres, buscar todos e filtrar localmente
      if (filters?.search && filters.search.length < 3) {
        const allUsers = await getUsers({ ...filters, search: undefined });
        const filteredUsers = allUsers.filter(user =>
          user.nome.toLowerCase().includes(filters.search!.toLowerCase()) ||
          user.email.toLowerCase().includes(filters.search!.toLowerCase())
        );
        setUsers(filteredUsers);
      } else {
        // Busca normal via API
        const data = await getUsers(filters);
        setUsers(data);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao carregar usuários.";
      setError(message);
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Buscar usuários iniciais (sem filtros)
  const fetchInitialUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUsers(); // Sem filtros na carga inicial
      setUsers(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao carregar usuários.";
      setError(message);
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carregar usuários apenas na montagem inicial
  useEffect(() => {
    fetchInitialUsers();
  }, [fetchInitialUsers]);

  // Criar usuário
  const handleCreateUser = useCallback(async (data: UserCreationData) => {
    try {
      setIsLoading(true);
      await createUser(data);
      toaster.create({
        title: "Sucesso",
        description: "Usuário criado com sucesso!",
        type: "success",
      });
      await fetchUsers(); // Recarregar lista
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao criar usuário.";
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers]);

  // Atualizar usuário
  const handleUpdateUser = useCallback(async (id: number, data: Partial<UserCreationData>) => {
    try {
      setIsLoading(true);
      await updateUser(id, data);
      toaster.create({
        title: "Sucesso",
        description: "Usuário atualizado com sucesso!",
        type: "success",
      });
      await fetchUsers(); // Recarregar lista
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao atualizar usuário.";
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers]);

  // Deletar usuário
  const handleDeleteUser = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      await deleteUser(id);
      toaster.create({
        title: "Sucesso",
        description: "Usuário removido com sucesso!",
        type: "success",
      });
      await fetchUsers(); // Recarregar lista
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao remover usuário.";
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers]);

  // Handlers para UI
  const handleCreate = useCallback(() => {
    setSelectedUser(null);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    if (window.confirm("Tem certeza que deseja remover este usuário?")) {
      await handleDeleteUser(id);
    }
  }, [handleDeleteUser]);

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  return {
    // Estado
    users,
    filters,
    isLoading,
    error,
    isModalOpen,
    selectedUser,

    // Ações
    setFilters,
    fetchUsers,
    createUser: handleCreateUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,

    // Handlers UI
    handleCreate,
    handleEdit,
    handleDelete,
    onCloseModal,
  };
};