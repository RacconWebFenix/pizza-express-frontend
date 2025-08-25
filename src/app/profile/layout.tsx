"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { PizzaLoading } from "@/components/ui";
import MainLayout from "@/components/layout/MainLayout";

export default function ProfileLayout({ children }: { children: ReactNode }) {
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
        message="Carregando perfil..."
        isVisible={true}
        fullscreen={true}
      />
    );
  }

  return <MainLayout>{children}</MainLayout>;
}
