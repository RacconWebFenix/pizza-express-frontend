"use client";

import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";
import { PizzaLoading } from "../../components/ui";
import MainLayout from "../../components/layout/MainLayout";
import { useAuth } from "@/features/auth/contexts/AuthContext";

interface PedidosLayoutProps {
  children: ReactNode;
}

export default function PedidosLayout({ children }: PedidosLayoutProps) {
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
        message="Carregando pedidos..."
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
