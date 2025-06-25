"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../../components/auth/auth-context";
import { useRouter } from "next/navigation";
import { Spinner, Flex } from "@chakra-ui/react";
import MainLayout from "../../components/layout/MainLayout";

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
      <Flex minH="100vh" align="center" justify="center" bg="brand.cream">
        <Spinner size="xl" color="brand.accent" />
      </Flex>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="brand.cream">
        <Spinner size="xl" color="brand.accent" />
      </Flex>
    );
  }

  return <MainLayout>{children}</MainLayout>;
}
