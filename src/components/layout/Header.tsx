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
import { usePermissions } from "@/hooks/usePermissions";
import { useRouter } from "next/navigation";
import { AdminMenuItems } from "./AdminMenuItems";

export function Header() {
  const { open, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user, logout } = useAuth();
  const { isStaff, isCliente, isAdmin } = usePermissions();
  const router = useRouter();

  // Itens de navegação dinâmicos baseado nas permissões
  const getNavItems = () => [
    {
      label: "Cardápio",
      href: "/cardapio",
      requiresAuth: true,
      requiresCliente: true,
    },
    {
      label: isStaff() ? "Gerenciar Pedidos" : "Meus Pedidos",
      href: "/pedidos",
      requiresAuth: true,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      requiresAuth: true,
      requiresStaff: true,
    },
  ];

  // Itens de navegação do admin (menu dropdown)
  const getAdminNavItems = () => [
    {
      label: "Dashboard",
      href: "/dashboard",
      requiresAuth: true,
      requiresAdmin: true,
    },
    {
      label: "Mesas",
      href: "/admin/mesas",
      requiresAuth: true,
      requiresStaff: true,
    },
    {
      label: "Produtos",
      href: "/admin/produtos",
      requiresAuth: true,
      requiresAdmin: true,
    },
    {
      label: "Categorias",
      href: "/admin/categorias",
      requiresAuth: true,
      requiresAdmin: true,
    },
    {
      label: "Entregadores",
      href: "/admin/delivery-persons",
      requiresAuth: true,
      requiresAdmin: true,
    },
    {
      label: "Usuários",
      href: "/admin/users",
      requiresAuth: true,
      requiresAdmin: true,
    },
  ];

  const accessibleNavItems = getNavItems().filter((item) => {
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.requiresStaff && !isStaff()) return false;
    if (item.requiresCliente && !isCliente()) return false;
    return true;
  });

  const accessibleAdminNavItems = getAdminNavItems().filter((item) => {
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.requiresStaff && !isStaff()) return false;
    if (item.requiresAdmin && !isAdmin()) return false;
    return true;
  });

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
          {isCliente() && <CartWidget />}

          {isAuthenticated ? (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant="ghost" _hover={{ bg: "whiteAlpha.200" }} p={2}>
                  <HStack gap={2}>
                    <Avatar.Root size="sm">
                      <Avatar.Image
                        src={user?.avatar || undefined}
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

                  {/* Menu Admin */}
                  {isAdmin() && (
                    <>
                      <Menu.Separator />
                      <AdminMenuItems items={accessibleAdminNavItems} />
                    </>
                  )}

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

                {/* Menu Admin Mobile */}
                {isAdmin() && (
                  <>
                    <Text fontSize="sm" color="gray.400" px={4} py={2}>
                      Administração
                    </Text>
                    {accessibleAdminNavItems.map((item) => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        justifyContent="flex-start"
                        color="white"
                        onClick={() => {
                          router.push(item.href);
                          onClose();
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </>
                )}

                <PizzaButton
                  variant="outline"
                  colorScheme="red"
                  justifyContent="flex-start"
                  icon={FaSignOutAlt}
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  Sair
                </PizzaButton>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
