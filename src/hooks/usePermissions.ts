"use client";

import { useAuth } from "@/features/auth/contexts/AuthContext";
import { Role } from "@/types/users";

/**
 * Hook para gerenciar permissões baseado em roles
 * Seguindo os princípios de SOLID e Clean Code
 */
export const usePermissions = () => {
  const { user, isAuthenticated } = useAuth();

  /**
   * Verifica se o usuário tem uma role específica
   */
  const hasRole = (role: Role | Role[]): boolean => {
    if (!isAuthenticated || !user) return false;

    if (Array.isArray(role)) {
      return role.includes(user.role);
    }

    return user.role === role;
  };

  /**
   * Verifica se o usuário é cliente
   */
  const isCliente = (): boolean => hasRole(Role.CLIENTE);

  /**
   * Verifica se o usuário é funcionário
   */
  const isFuncionario = (): boolean => hasRole(Role.FUNCIONARIO);

  /**
   * Verifica se o usuário é admin
   */
  const isAdmin = (): boolean => hasRole(Role.ADMIN);

  /**
   * Verifica se o usuário tem permissões de staff (funcionário ou admin)
   */
  const isStaff = (): boolean => hasRole([Role.FUNCIONARIO, Role.ADMIN]);

  /**
   * Verifica se o usuário pode acessar recursos administrativos
   */
  const canAccessAdmin = (): boolean => isAdmin();

  /**
   * Verifica se o usuário pode gerenciar pedidos
   */
  const canManageOrders = (): boolean => isStaff();

  /**
   * Verifica se o usuário pode gerenciar pizzas/cardápio
   */
  const canManagePizzas = (): boolean => isAdmin();

  /**
   * Verifica se o usuário pode gerenciar usuários
   */
  const canManageUsers = (): boolean => isAdmin();

  /**
   * Verifica se o usuário pode gerenciar entregadores
   */
  const canManageDeliveryPersons = (): boolean => isAdmin();

  /**
   * Verifica se o usuário pode visualizar todos os pedidos
   */
  const canViewAllOrders = (): boolean => isStaff();

  /**
   * Verifica se o usuário pode atualizar status de pedidos
   */
  const canUpdateOrderStatus = (): boolean => isStaff();

  return {
    // Métodos básicos
    hasRole,
    isCliente,
    isFuncionario,
    isAdmin,
    isStaff,

    // Métodos específicos por recurso
    canAccessAdmin,
    canManageOrders,
    canManagePizzas,
    canManageUsers,
    canManageDeliveryPersons,
    canViewAllOrders,
    canUpdateOrderStatus,

    // Informações do usuário
    user,
    isAuthenticated,
    userRole: user?.role,
  };
};
