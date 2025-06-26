"use client";

import { Box, Button, Input, Heading, VStack, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../components/auth/auth-context";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const responseData = await response.json();

      if (response.ok && responseData.access_token) {
        // Tenta validar o token e completar o login
        const loginSuccess = await login(responseData.access_token);

        if (loginSuccess) {
          // Use window.location para garantir redirecionamento em produção
          if (typeof window !== "undefined") {
            window.location.href = "/cardapio";
          } else {
            router.push("/cardapio");
          }
        } else {
          alert("Erro na validação do usuário. Por favor, tente novamente.");
        }
      } else {
        alert(
          "Erro ao realizar login. Verifique suas credenciais e tente novamente."
        );
      }
    } catch {
      alert("Erro inesperado. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bg="brand.light"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          bg="white"
          p={8}
          rounded="lg"
          shadow="md"
          borderTop="4px"
          borderTopColor="brand.primary"
        >
          {loading ? (
            <VStack gap={6}>
              <Spinner size="xl" color="brand.primary" />
              <Heading color="brand.primary" size="md">
                Fazendo login...
              </Heading>
            </VStack>
          ) : (
            <VStack
              as="form"
              onSubmit={handleSubmit}
              gap={6}
              align="stretch"
              maxWidth="400px"
              w="full"
            >
              <Heading color="brand.primary" textAlign="center">
                Pizza Express
              </Heading>

              <Box>
                <Box
                  color="brand.medium"
                  mb={2}
                  fontSize="sm"
                  fontWeight="medium"
                >
                  Email
                </Box>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  bg="white"
                  color="brand.dark"
                  border="1px"
                  borderColor="gray.300"
                  _placeholder={{ color: "gray.500" }}
                  _focus={{
                    borderColor: "brand.primary",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-primary)",
                  }}
                  required
                />
              </Box>

              <Box>
                <Box
                  color="brand.medium"
                  mb={2}
                  fontSize="sm"
                  fontWeight="medium"
                >
                  Senha
                </Box>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  bg="white"
                  color="brand.dark"
                  border="1px"
                  borderColor="gray.300"
                  _placeholder={{ color: "gray.500" }}
                  _focus={{
                    borderColor: "brand.primary",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-primary)",
                  }}
                  required
                />
              </Box>

              <Button
                type="submit"
                bg="brand.accent"
                color="white"
                width="full"
                _hover={{ bg: "brand.primary" }}
                disabled={loading}
              >
                Entrar
              </Button>

              <Box textAlign="center">
                <Link href="/register">
                  <Button variant="ghost" color="brand.primary">
                    Não tem uma conta? Registre-se
                  </Button>
                </Link>
              </Box>
            </VStack>
          )}
        </Box>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
