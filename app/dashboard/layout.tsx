"use client";

"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../../components/auth/auth-context";
import { useRouter } from "next/navigation";
import { PizzaLoading } from "../../components/ui";
import MainLayout from "../../components/layout/MainLayout";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <PizzaLoading
        message="Carregando dashboard..."
        isVisible={true}
        fullscreen={true}
        showMessage={true}
      />
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <PizzaLoading
        message="Verificando acesso..."
        isVisible={true}
        fullscreen={true}
        showMessage={true}
      />
    );
  }

  return <MainLayout>{children}</MainLayout>;
}
