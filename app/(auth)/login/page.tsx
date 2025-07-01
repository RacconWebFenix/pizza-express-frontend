"use client";

import { Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  PizzaButton,
  PizzaCard,
  PizzaText,
  PizzaInput,
  PizzaSpinner,
} from "@/components/ui";
import { useLogin } from "@/hooks/useLogin";

const LoginPage = () => {
  const {
    email,
    password,
    loading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin();

  return (
    <Box
      bg="yellow.100"
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
        <PizzaCard variant="default" borderTopColor="brand.primary">
          {loading ? (
            <VStack gap={6}>
              <PizzaSpinner size={48} />
              <PizzaText variant="heading" color="brand.primary">
                Fazendo login...
              </PizzaText>
            </VStack>
          ) : (
            <VStack
              as="form"
              onSubmit={handleSubmit}
              gap={4} // Reduzido de 6 para 4
              align="stretch"
              maxWidth="400px"
              w="full"
            >
              <PizzaText
                variant="heading"
                color="brand.primary"
                textAlign="center"
              >
                Pizza Express
              </PizzaText>

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
                  ❌ {error}
                </Box>
              )}

              <PizzaInput
                label="Email"
                type="email"
                value={email}
                width="full"
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="Digite seu email"
                required
              />

              <PizzaInput
                label="Senha"
                type="password"
                value={password}
                width="full"
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Digite sua senha"
                required
              />

              <PizzaButton
                type="submit"
                variant="primary"
                width="full"
                disabled={loading}
              >
                Entrar
              </PizzaButton>

              <Box textAlign="center">
                <Link href="/register">
                  <PizzaButton variant="ghost" color="brand.primary">
                    Não tem uma conta? Registre-se
                  </PizzaButton>
                </Link>
              </Box>
            </VStack>
          )}
        </PizzaCard>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
