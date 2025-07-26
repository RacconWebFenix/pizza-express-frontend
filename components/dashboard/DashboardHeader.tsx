// /components/dashboard/DashboardHeader.tsx
"use client";

import { Flex, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../auth/auth-context";
import { PizzaButton } from "../ui"; // Vamos usar nosso botão padrão

export function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={4}
 
      bg="brand.surface" // Fundo branco
      borderColor="gray.200"
 
      boxShadow="md"
      borderBottomWidth="1px"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Heading
        as="h1"
        size="md"
        // Aplicando a fonte e a cor primária do tema
        fontFamily="heading"
        color="brand.primary" // Vermelho para destaque
      >
        Pizza Express Dashboard
      </Heading>
      <Flex align="center" gap={4}>
        <Text
          fontWeight="medium"
          // Cor de texto principal para o email
          color="brand.textPrimary"
          display={{ base: "none", md: "block" }}
        >
          {user?.email}
        </Text>
        {/* Usando o PizzaButton para consistência visual */}
        <PizzaButton variant="ghost" size="sm" onClick={logout}>
          Sair
        </PizzaButton>
      </Flex>
    </Flex>
  );
}
