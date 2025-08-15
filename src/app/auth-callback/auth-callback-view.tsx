"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Flex } from "@chakra-ui/react";

import { useAuth } from "@/features/auth/contexts/AuthContext";
import { PizzaLoading } from "@/components/ui";

// O nome da função foi alterado para ser mais descritivo
export default function AuthCallbackView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleAuthentication } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      console.error("Falha na autenticação do Google:", error);
      router.push("/login?error=true");
      return;
    }

    if (token) {
      console.log("[AUTH-CALLBACK] Processando token...");
      handleAuthentication(token);
    } else {
      console.error("[AUTH-CALLBACK] Nenhum token encontrado na URL");
      router.push("/login?error=true");
    }
  }, [searchParams, handleAuthentication, router]);

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <PizzaLoading />
    </Flex>
  );
}
