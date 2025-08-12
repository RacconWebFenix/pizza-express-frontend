"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { PizzaLoading } from "../../components/ui";

import MainLayout from "@/components/layout/MainLayout";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <PizzaLoading
        message="Carregando dashboard..."
        isVisible={true}
        fullscreen={true}
      />
    );
  }

  // Novo layout que envolve todo o dashboard
  return <MainLayout>{children}</MainLayout>;
}
