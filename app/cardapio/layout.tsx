"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../../components/auth/auth-context";
import { useRouter } from "next/navigation";
import { Spinner, Flex } from "@chakra-ui/react";
import MainLayout from "../../components/layout/MainLayout";

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

  if (isLoading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="blue.50">
        <Spinner size="xl" color="blue.800" />
      </Flex>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="blue.50">
        <Spinner size="xl" color="blue.800" />
      </Flex>
    );
  }

  return <MainLayout>{children}</MainLayout>;
}
