// src/app/(auth)/layout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { PizzaLoading } from "@/features/cart/components/ui";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se não estiver carregando e o usuário ESTIVER autenticado, redireciona para o dashboard
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostra uma tela de loading enquanto a sessão está sendo verificada
  if (isLoading || isAuthenticated) {
    return <PizzaLoading message="Verificando sessão..." fullscreen />;
  }

  // Se não estiver carregando e não estiver autenticado, mostra o conteúdo (página de login/registro)
  return (
    <Box
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      {children}
    </Box>
  );
}
