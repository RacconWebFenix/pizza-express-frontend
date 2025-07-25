"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../../components/auth/auth-context";
import { useRouter } from "next/navigation";
import { PizzaLoading } from "../../components/ui";
import { Box } from "@chakra-ui/react";
import { DashboardHeader } from "../../components/dashboard"; // Importando seu componente de header

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
  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
      {/* O seu DashboardHeader agora faz parte do layout principal */}
      <DashboardHeader />
      <Box as="main" p={{ base: 4, md: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
