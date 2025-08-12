"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import { PizzaLoading } from "@/components/ui";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleAuthentication } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      console.error("Falha na autenticação do Google:", error);
      // Opcional: Adicionar uma notificação de erro aqui (com Chakra Toast, por exemplo)
      router.push("/login?error=true");
      return;
    }

    if (token) {
      console.log("[AUTH-CALLBACK] Processando token...");
      // Chama a função do contexto para salvar o token, buscar o usuário e redirecionar
      handleAuthentication(token);
    } else {
      console.error("[AUTH-CALLBACK] Nenhum token encontrado na URL");
      // Se por algum motivo não houver token nem erro, volta para o login
      router.push("/login?error=true");
    }
    // As dependências garantem que o efeito rode apenas quando necessário
  }, [searchParams, handleAuthentication, router]);

  // Enquanto o handleAuthentication está rodando, o `isLoading` do contexto
  // estará true, mas podemos mostrar um spinner simples aqui de qualquer forma.
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
