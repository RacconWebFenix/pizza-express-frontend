"use client";

import { Box, Flex, Heading, Button, Icon, HStack } from "@chakra-ui/react";
import { FaPizzaSlice, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../auth/auth-context";
import { useRouter } from "next/navigation";
import NavItem from "./NavItem";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Box
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={4}
        py={3}
        justify="space-between"
        align="center"
      >
        {/* Logo */}
        <Heading
          color="brand.primary"
          size="lg"
          cursor="pointer"
          onClick={() => router.push("/")}
        >
          <Flex align="center" gap={2}>
            <Icon as={FaPizzaSlice} color="brand.pizza" />
            Pizza Express
          </Flex>
        </Heading>

        {/* Navegação */}
        <HStack gap={4}>
          <NavItem href="/cardapio" label="Cardápio" />
          <NavItem href="/pedidos" label="Meus Pedidos" />
          <NavItem href="/dashboard" label="Dashboard" />
        </HStack>

        {/* User Info & Logout */}
        <Flex align="center" gap={4}>
          {user && (
            <Box color="brand.charcoal" fontSize="sm">
              Olá, {user.email.split("@")[0]}!
            </Box>
          )}
          <Button
            size="sm"
            colorScheme="gray"
            variant="outline"
            color="brand.medium"
            borderColor="brand.medium"
            _hover={{ bg: "brand.light", borderColor: "brand.primary" }}
            onClick={handleLogout}
          >
            <Icon as={FaSignOutAlt} />
            Sair
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
