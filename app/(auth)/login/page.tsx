"use client";

import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PizzaButton, PizzaInput, PizzaSpinner } from "../../../components/ui";
import { useLogin } from "../../../hooks/useLogin";

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

            <Box textAlign="center" mt={2}>
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
