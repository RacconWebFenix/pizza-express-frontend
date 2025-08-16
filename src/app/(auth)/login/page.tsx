"use client";

import { useState, FormEvent } from "react";
import { Box, VStack, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { PizzaButton, PizzaInput, PizzaLoading } from "@/components/ui";


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

    // Validação simples
    if (!email || !password) {
      setError("Por favor, preencha o email e a senha.");
      return;
    }

    try {
      // Chama a função de login do authService através do context
      const loginSuccess = await login({ email, password });
      if (!loginSuccess) {
        setError("Credenciais inválidas. Verifique seu email e senha.");
      }
      // O redirecionamento já é tratado pelo AuthContext
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro inesperado."
      );
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
              {/* SVG do Google Icon aqui */}
              <Text>Entrar com Google</Text>
            </Flex>
          </PizzaButton>

          <Text color="gray.500">ou entre com seu e-mail</Text>

          <PizzaInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error ? " " : undefined} // Apenas para marcar o campo
            required
          />
          <PizzaInput
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error ? " " : undefined}
            required
          />
          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}

          <PizzaButton type="submit" w="full" size="lg" loading={isLoading}>
            Entrar
          </PizzaButton>

          <Box textAlign="center" mt={2}>
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
              Não tem uma conta?{" "}
              <Link href="/register">
                <Button variant="ghost" colorScheme="orange" size="sm">
                  Cadastre-se
                </Button>
              </Link>
            </Text>
          </Box>
        </VStack>
      </Box>
    </motion.div>
  );
}
