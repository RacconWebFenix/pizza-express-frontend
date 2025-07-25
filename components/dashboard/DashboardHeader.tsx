"use client";

import {
  Flex,
  Heading,
  Text,
  Button, // O Avatar foi removido das importações
} from "@chakra-ui/react";
import { useAuth } from "../auth/auth-context";

export function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={4}
      bg="white"
      boxShadow="md"
      borderBottomWidth="1px"
      borderColor="gray.200"
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Heading size="md" color="brand.primary">
        Pizza Express Dashboard
      </Heading>
      <Flex align="center" gap={4}>
        {/* O Avatar foi removido e o email do usuário é exibido no lugar */}
        <Text fontWeight="medium" display={{ base: "none", md: "block" }}>
          {user?.email}
        </Text>
        <Button colorScheme="red" size="sm" variant="outline" onClick={logout}>
          Sair
        </Button>
      </Flex>
    </Flex>
  );
}
