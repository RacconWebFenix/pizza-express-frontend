"use client";

import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/contexts/AuthContext";
import { PizzaLoading } from "@/components/ui";
import MainLayout from "@/components/layout/MainLayout";

interface CardapioLayoutProps {
  children: ReactNode;
}

export default function CardapioLayout({ children }: CardapioLayoutProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostrar loading enquanto está carregando
  if (isLoading) {
    return (
      <PizzaLoading
        message="Carregando cardápio..."
        isVisible={true}
        fullscreen={true}
        showMessage={true}
      />
    );
  }

  // Se não está autenticado, mostrar loading (vai redirecionar)
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
