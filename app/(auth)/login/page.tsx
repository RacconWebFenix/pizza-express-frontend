"use client";

import { Box, Button, Input, Heading, VStack, Spinner } from "@chakra-ui/react";
import { useState } from "react";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../components/auth/auth-context";

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
          router.push("/");
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
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgGradient="linear(to-br, brand.primary, brand.accent)"
      >
        {loading ? (
          <Spinner size="xl" color="brand.accent" />
        ) : (
          <VStack
            as="form"
            onSubmit={handleSubmit}
            gap={4}
            bg="white"
            p={8}
            borderRadius="lg"
            boxShadow="lg"
            maxWidth="400px"
            w="full"
          >
            <Heading color="brand.primary">Pizza Express</Heading>
            <Box>
              <label>Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                bg="brand.cream"
                color="brand.dark"
              />
            </Box>
            <Box>
              <label>Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                bg="brand.cream"
                color="brand.dark"
              />
            </Box>
            <Button
              type="submit"
              bg="brand.accent"
              color="white"
              width="full"
              _hover={{ bg: "brand.primary" }}
            >
              Entrar
            </Button>
          </VStack>
        )}
      </Box>
    </motion.div>
  );
};

export default LoginPage;
