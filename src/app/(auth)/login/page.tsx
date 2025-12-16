"use client";

import { useState, FormEvent } from "react";
import { Box, VStack, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { PizzaButton, PizzaInput, PizzaLoading } from "@/components/ui";
import { toaster } from "@/components/ui/toaster";
import { FcGoogle } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa";

/**
 * Página de Login.
 * Refatorada para usar o estado local do formulário e o hook 'useAuth' centralizado.
 */
export default function LoginPage() {
  // O estado do formulário (email, senha) agora vive aqui. É um estado local.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // A lógica de autenticação (login, loading) vem do nosso AuthContext.
  const { login, isLoading, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validação mais robusta
    if (!email.trim()) {
      setError("Por favor, informe seu endereço de e-mail.");
      return;
    }

    if (!password.trim()) {
      setError("Por favor, informe sua senha.");
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, informe um endereço de e-mail válido.");
      return;
    }

    try {
      // Chama a função de login do authService através do context
      const loginSuccess = await login({ email, password });
      if (!loginSuccess) {
        setError(
          "Falha na autenticação. Verifique suas credenciais e tente novamente."
        );
      }
      // O redirecionamento já é tratado pelo AuthContext
    } catch (err) {
      console.error("Erro no login:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Erro inesperado durante o login.";
      setError(errorMessage);

      // Mostra toast de erro para feedback mais visível
      toaster.create({
        title: "Erro no Login",
        description: errorMessage,
        type: "error",
        duration: 5000,
      });
    }
  };

  if (isLoading) {
    return <PizzaLoading message="Autenticando..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%", maxWidth: "420px" }}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="xl"
        w="full"
        borderTop="4px solid"
        borderColor="brand.primary"
        _dark={{ bg: "gray.800", borderColor: "brand.secondary" }}
      >
        <VStack gap={6} as="form" onSubmit={handleSubmit}>
          <Heading size="lg" color="brand.textPrimary">
            Acessar sua Conta
          </Heading>

          {/* O Google Login continua usando a função do AuthContext */}
          <PizzaButton onClick={signInWithGoogle} w="full" variant="outline">
            <Flex align="center" gap="2">
              <FcGoogle size={24} />
              <Text>Entrar com Google</Text>
            </Flex>
          </PizzaButton>

          <Text color="gray.500">ou entre com seu e-mail</Text>

          <PizzaInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={
              error &&
              (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                ? "Email inválido"
                : undefined
            }
            required
          />
          <PizzaInput
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error && !password.trim() ? "Senha obrigatória" : undefined}
            required
          />
          {error && (
            <Box
              p={3}
              bg="red.50"
              border="1px solid"
              borderColor="red.200"
              borderRadius="md"
              _dark={{
                bg: "red.900",
                borderColor: "red.700",
              }}
            >
              <Text color="red.600" fontSize="sm" fontWeight="medium">
                {error}
              </Text>
            </Box>
          )}

          <PizzaButton type="submit" w="full" size="lg" loading={isLoading}>
            Entrar
          </PizzaButton>

          <Box textAlign="center" mt={2}>
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
              Não tem uma conta?{" "}
              <Link href="/register">
                <PizzaButton variant="outline" size="sm" icon={FaUserPlus}>
                  Cadastre-se
                </PizzaButton>
              </Link>
            </Text>
          </Box>
        </VStack>
      </Box>
    </motion.div>
  );
}
