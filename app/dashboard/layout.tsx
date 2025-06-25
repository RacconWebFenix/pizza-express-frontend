"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../../components/auth/auth-context";
import { useRouter } from "next/navigation";
import { Spinner, Flex } from "@chakra-ui/react";
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
      <Flex minH="100vh" align="center" justify="center" bg="brand.cream">
        <Spinner size="xl" color="brand.red" />
      </Flex>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="brand.cream">
        <Spinner size="xl" color="brand.red" />
      </Flex>
    );
  }

  return <MainLayout>{children}</MainLayout>;
}
