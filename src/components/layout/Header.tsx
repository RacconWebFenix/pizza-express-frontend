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
  Spacer,
  Button,
  Text,
  Avatar,
  Menu,
} from "@chakra-ui/react";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import NavItem from "./NavItem";
import CartWidget from "@/features/cart/components/CartWidget";
import MobileNavItem from "./MobileNavItem";
import { PizzaButton } from "../ui";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "Cardápio", href: "/cardapio" },
  { label: "Meus Pedidos", href: "/pedidos", requiresAuth: true },
  { label: "Dashboard", href: "/dashboard", requiresAuth: true },
];

export function Header() {
  const { open, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const accessibleNavItems = NAV_ITEMS.filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  return (
    <Box
      as="header"
      bg="gray.800"
      bgGradient="linear(to-br, gray.800, black)"
      color="white"
      px={4}
      boxShadow="lg"
      borderBottomWidth="1px"
      borderColor="gray.700"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex h={16} alignItems="center">
        <HStack gap={8} alignItems="center">
          <IconButton
            size="md"
            aria-label="Abrir Menu"
            display={{ md: "none" }}
            onClick={open ? onClose : onOpen}
            variant="ghost"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            {open ? <FaTimes color="white" /> : <FaBars color="white" />}
          </IconButton>
          <Link href="/" passHref>
            <Heading size="md" fontFamily="heading" color="whiteAlpha.900">
              Pizza Express
            </Heading>
          </Link>
          <HStack as="nav" gap={4} display={{ base: "none", md: "flex" }}>
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

        <Flex alignItems="center" gap={4}>
          <CartWidget />

          {isAuthenticated ? (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant="ghost" _hover={{ bg: "whiteAlpha.200" }} p={2}>
                  <HStack gap={2}>
                    <Avatar.Root size="sm">
                      <Avatar.Image
                        src={user?.avatar || ""}
                        alt={user?.nome || ""}
                      />
                      <Avatar.Fallback>
                        {user?.nome?.charAt(0) || "U"}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <Text
                      display={{ base: "none", md: "block" }}
                      color="whiteAlpha.800"
                      fontSize="sm"
                    >
                      {user?.nome}
                    </Text>
                    <FaChevronDown size={12} />
                  </HStack>
                </Button>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content bg="gray.800" borderColor="gray.700" minW="200px">
                  <Menu.Item
                    value="profile"
                    onClick={() => router.push("/profile")}
                  >
                    <HStack gap={2}>
                      <FaUser />
                      <Text>Meu Perfil</Text>
                    </HStack>
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item value="logout" onClick={logout}>
                    <HStack gap={2} color="red.400">
                      <FaSignOutAlt />
                      <Text>Sair</Text>
                    </HStack>
                  </Menu.Item>
                  <Menu.Arrow />
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          ) : (
            <Link href="/login" passHref>
              <PizzaButton as="a" colorScheme="orange" size="sm">
                Entrar
              </PizzaButton>
            </Link>
          )}
        </Flex>
      </Flex>

      {open ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" gap={4}>
            {accessibleNavItems.map((navItem) => (
              <MobileNavItem
                key={navItem.label}
                href={navItem.href}
                label={navItem.label}
                onClick={onClose}
              />
            ))}
            {isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  color="white"
                  onClick={() => {
                    router.push("/profile");
                    onClose();
                  }}
                >
                  Meu Perfil
                </Button>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  color="red.300"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  Sair
                </Button>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
