"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import { PizzaSpinner } from "../../components/ui";
import { useAuth } from "../../components/auth/auth-context";

const AuthCallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Verifica se há um token nos parâmetros da URL
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (error) {
          setStatus("error");
          setErrorMessage(decodeURIComponent(error));
          return;
        }

        if (!token) {
          setStatus("error");
          setErrorMessage("Token não encontrado na URL");
          return;
        }

        // Tenta fazer login com o token
        const loginSuccess = await login(token);

        if (loginSuccess) {
          setStatus("success");
          // Redireciona para o cardápio após 2 segundos
          setTimeout(() => {
            router.push("/cardapio");
          }, 2000);
        } else {
          setStatus("error");
          setErrorMessage("Falha na validação do token");
        }
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error ? err.message : "Erro desconhecido"
        );
      }
    };

    processCallback();
  }, [searchParams, login, router]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <VStack gap={6} py={8}>
            <PizzaSpinner size={48} />
            <Heading size="lg" color="brand.primary">
              Processando autenticação...
            </Heading>
            <Text color="gray.600" textAlign="center">
              Aguarde enquanto validamos seus dados
            </Text>
          </VStack>
        );

      case "success":
        return (
          <VStack gap={6} py={8}>
            <Box fontSize="4xl">✅</Box>
            <Heading size="lg" color="green.600">
              Login realizado com sucesso!
            </Heading>
            <Text color="gray.600" textAlign="center">
              Redirecionando para o cardápio...
            </Text>
          </VStack>
        );

      case "error":
        return (
          <VStack gap={6} py={8}>
            <Box fontSize="4xl">❌</Box>
            <Heading size="lg" color="red.600">
              Erro na autenticação
            </Heading>
            <Text color="gray.600" textAlign="center">
              {errorMessage}
            </Text>
            <Box
              as="button"
              onClick={() => router.push("/login")}
              bg="brand.primary"
              color="white"
              px={6}
              py={3}
              rounded="md"
              _hover={{ bg: "brand.secondary" }}
            >
              Voltar ao Login
            </Box>
          </VStack>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="xl"
        w="full"
        maxW="420px"
        borderTop="4px solid"
        borderColor="brand.primary"
        _dark={{ bg: "gray.800", borderColor: "brand.secondary" }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

const AuthCallbackPage = () => {
  return (
    <Suspense
      fallback={
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.50"
          _dark={{ bg: "gray.900" }}
        >
          <Box
            bg="white"
            p={8}
            borderRadius="xl"
            boxShadow="xl"
            w="full"
            maxW="420px"
            borderTop="4px solid"
            borderColor="brand.primary"
            _dark={{ bg: "gray.800", borderColor: "brand.secondary" }}
          >
            <VStack gap={6} py={8}>
              <PizzaSpinner size={48} />
              <Heading size="lg" color="brand.primary">
                Carregando...
              </Heading>
            </VStack>
          </Box>
        </Box>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
};

export default AuthCallbackPage;
