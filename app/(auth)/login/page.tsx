"use client";

import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PizzaButton, PizzaInput, PizzaSpinner } from "../../../components/ui";
import { useLogin } from "../../../hooks/useLogin";
import { useAuth } from "@/components/auth/auth-context"; // 👈 1. Importe o useAuth

const LoginPage = () => {
  // Mantemos o useLogin para o formulário de email/senha
  const {
    email,
    password,
    loading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin();

  // Usamos o useAuth especificamente para a função de login com Google
  const { signInWithGoogle } = useAuth(); // 👈 2. Obtenha a função signInWithGoogle

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
        {loading ? (
          <VStack gap={6} py={8}>
            <PizzaSpinner size={48} />
            <Heading size="lg" color="brand.primary">
              Fazendo login...
            </Heading>
          </VStack>
        ) : (
          <VStack
            as="form"
            onSubmit={handleSubmit}
            gap={5}
            align="stretch"
            w="full"
          >
            <Heading
              size="lg"
              color="gray.700"
              textAlign="center"
              _dark={{ color: "white" }}
            >
              Bem-vindo de volta!
            </Heading>

            {error && (
              <Box
                bg="red.50"
                color="red.800"
                p={3}
                rounded="md"
                border="1px"
                borderColor="red.200"
                textAlign="center"
              >
                <Text fontWeight="medium">❌ {error}</Text>
              </Box>
            )}

            <PizzaInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="seu@email.com"
              color="white"
              required
            />

            <PizzaInput
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="Digite sua senha"
              required
            />

            <PizzaButton
              type="submit"
              variant="solid"
              w="full"
              size="lg"
              disabled={loading}
              mt={2}
            >
              Entrar
            </PizzaButton>

            <Box textAlign="center" my={4}>
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: "gray.400" }}
              >
                ou
              </Text>
            </Box>

            <PizzaButton
              variant="outline"
              w="full"
              size="lg"
              onClick={signInWithGoogle} // 👈 3. Use a função do AuthContext aqui
              disabled={loading}
            >
              <Box mr={3}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  {/* ... seu SVG do Google ... */}
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </Box>
              Continuar com Google
            </PizzaButton>

            <Box textAlign="center" mt={4}>
              <Text
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.300" }}
              >
                Não tem uma conta?{" "}
                <Link href="/register">
                  <Button variant="outline" colorScheme="yellow" size="sm">
                    Registre-se aqui
                  </Button>
                </Link>
              </Text>
            </Box>
          </VStack>
        )}
      </Box>
    </motion.div>
  );
};

export default LoginPage;
