// /components/layout/Header.tsx
"use client";

import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../auth/auth-context";
import NavItem from "./NavItem";
import CartWidget from "../cart/CartWidget";
import MobileNavItem from "./MobileNavItem";
import { PizzaButton } from "../ui";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Cardápio", href: "/cardapio" },
  { label: "Dashboard", href: "/dashboard", requiresAuth: true },
];

export function Header() {
  const { open, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user, logout } = useAuth();

  const accessibleNavItems = NAV_ITEMS.filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  return (
    <Box
      as="header"
      bg="brand.surface"
      px={4}
      boxShadow="md"
      borderBottomWidth="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex h={16} alignItems={"center"}>
        <HStack gap={8} alignItems={"center"}>
          <IconButton
            size={"md"}
            aria-label={"Abrir Menu"}
            display={{ md: "none" }}
            onClick={open ? onClose : onOpen}
            variant="ghost"
          >
            {open ? <FaTimes /> : <FaBars />}
          </IconButton>
          <Link href="/" passHref>
            <Heading size="md" fontFamily="heading" color="brand.primary">
              Pizza Express
            </Heading>
          </Link>
          <HStack as={"nav"} gap={4} display={{ base: "none", md: "flex" }}>
            {accessibleNavItems.map((navItem) => (
              <NavItem
                key={navItem.label}
                href={navItem.href}
                label={navItem.label}
              />
            ))}
          </HStack>
        </HStack>

        <Spacer />

        <Flex alignItems={"center"} gap={4}>
          {/* CORREÇÃO: O CartWidget agora está fora da lógica condicional */}
          <CartWidget />

          {isAuthenticated ? (
            // Se ESTIVER logado:
            <>
              <Text fontWeight="medium" display={{ base: "none", md: "block" }}>
                {user?.email}
              </Text>
              <PizzaButton variant="ghost" size="sm" onClick={logout}>
                Sair
              </PizzaButton>
            </>
          ) : (
            // Se NÃO ESTIVER logado:
            <Link href="/login" passHref>
              <PizzaButton as="a" variant="primary" size="sm">
                Entrar
              </PizzaButton>
            </Link>
          )}
        </Flex>
      </Flex>

      {open ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} gap={4}>
            {accessibleNavItems.map((navItem) => (
              <MobileNavItem
                key={navItem.label}
                href={navItem.href}
                label={navItem.label}
                onClick={onClose}
              />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
