"use client";

import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  HStack,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { FaPizzaSlice, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../auth/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavItem from "./NavItem";
import MobileNavItem from "./MobileNavItem";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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

        {/* Navegação Desktop */}
        <HStack gap={4} display={{ base: "none", md: "flex" }}>
          <NavItem href="/cardapio" label="Cardápio" />
          <NavItem href="/pedidos" label="Meus Pedidos" />
          <NavItem href="/dashboard" label="Dashboard" />
        </HStack>

        {/* User Info & Logout - Desktop */}
        <Flex align="center" gap={4} display={{ base: "none", md: "flex" }}>
          {user && (
            <Box color="brand.medium" fontSize="sm">
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
            <Icon as={FaSignOutAlt} mr={2} />
            Sair
          </Button>
        </Flex>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Abrir menu"
          variant="ghost"
          color="brand.primary"
          onClick={toggleMobileMenu}
          size="lg"
        >
          <Icon as={isMobileMenuOpen ? FaTimes : FaBars} />
        </IconButton>
      </Flex>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <Box
          display={{ base: "block", md: "none" }}
          bg="white"
          borderTop="1px"
          borderColor="gray.200"
          py={4}
          px={4}
        >
          <VStack gap={4} align="stretch">
            {/* Navigation Links */}
            <MobileNavItem
              href="/cardapio"
              label="Cardápio"
              onClick={closeMobileMenu}
            />
            <MobileNavItem
              href="/pedidos"
              label="Meus Pedidos"
              onClick={closeMobileMenu}
            />
            <MobileNavItem
              href="/dashboard"
              label="Dashboard"
              onClick={closeMobileMenu}
            />

            {/* User Info */}
            {user && (
              <Box color="brand.medium" fontSize="sm" py={2}>
                Olá, {user.email.split("@")[0]}!
              </Box>
            )}

            {/* Logout Button */}
            <Button
              colorScheme="gray"
              variant="outline"
              color="brand.medium"
              borderColor="brand.medium"
              _hover={{ bg: "brand.light", borderColor: "brand.primary" }}
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
              justifyContent="flex-start"
            >
              <Icon as={FaSignOutAlt} mr={2} />
              Sair
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
}
