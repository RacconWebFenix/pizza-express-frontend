"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { Role } from "@/types/users";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: Role | Role[];
  fallbackPath?: string;
  showAccessDenied?: boolean;
}

/**
 * Componente para proteger rotas baseado em roles
 * Redireciona usuários não autorizados ou mostra mensagem de acesso negado
 */
export const ProtectedRoute = ({
  children,
  requiredRoles,
  fallbackPath = "/access-denied",
  showAccessDenied = true,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasRole } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (requiredRoles && !hasRole(requiredRoles)) {
      if (showAccessDenied) {
        router.push(fallbackPath);
      } else {
        router.push("/dashboard");
      }
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    hasRole,
    requiredRoles,
    router,
    fallbackPath,
    showAccessDenied,
  ]);

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="background.primary"
      >
        <VStack gap={4}>
          <Spinner size="xl" color="brand.primary" />
          <Text color="text.secondary">Verificando permissões...</Text>
        </VStack>
      </Box>
    );
  }

  // Se não está autenticado, não renderiza nada (redirecionamento em andamento)
  if (!isAuthenticated) {
    return null;
  }

  // Se tem roles requeridas e não tem permissão, não renderiza nada
  if (requiredRoles && !hasRole(requiredRoles)) {
    return null;
  }

  // Tudo ok, renderiza o conteúdo
  return <>{children}</>;
};

/**
 * Componente específico para rotas de admin
 */
export const AdminRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles={Role.ADMIN}>{children}</ProtectedRoute>
);

/**
 * Componente específico para rotas de staff (funcionário ou admin)
 */
export const StaffRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles={[Role.FUNCIONARIO, Role.ADMIN]}>
    {children}
  </ProtectedRoute>
);

/**
 * Componente específico para rotas de cliente
 */
export const ClientRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles={Role.CLIENTE}>{children}</ProtectedRoute>
);
