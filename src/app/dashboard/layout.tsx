"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { PizzaLoading } from "@/components/ui";
import MainLayout from "@/components/layout/MainLayout";
import { usePermissions } from "@/hooks/usePermissions";
import { Role } from "@/types/users";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const { hasRole } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!hasRole([Role.FUNCIONARIO, Role.ADMIN])) {
      router.push("/cardapio");
      return;
    }
  }, [isAuthenticated, isLoading, hasRole, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <PizzaLoading
        message="Carregando dashboard..."
        isVisible={true}
        fullscreen={true}
      />
    );
  }

  if (!hasRole([Role.FUNCIONARIO, Role.ADMIN])) {
    return (
      <PizzaLoading
        message="Redirecionando..."
        isVisible={true}
        fullscreen={true}
      />
    );
  }

  // Novo layout que envolve todo o dashboard
  return <MainLayout>{children}</MainLayout>;
}
