"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Icon,
  VStack,
  Badge,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaPizzaSlice, FaLeaf, FaFire } from "react-icons/fa";
import { useAuth } from "@/components/auth/auth-context";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redireciona usuários logados para o cardápio
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/cardapio");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleNavigateToWelcome = () => {
    router.push("/cardapio");
  };

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <Box
        bg="brand.light"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Carregando...</Text>
      </Box>
    );
  }

  return (
    <Box
      bg="brand.light"
      minH="100vh"
      p={8}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <VStack gap={8} align="center" maxW="700px" textAlign="center">
        {/* Logo e Branding da Fênix */}
        <VStack gap={4}>
          <Flex align="center" gap={3}>
            <Box>
              <Image
                src="/fenix-icon.svg"
                alt="Fênix Empreendimentos"
                width="48px"
                height="48px"
              />
            </Box>
            <VStack align="flex-start" gap={1}>
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="brand.primary"
                lineHeight="1.2"
              >
                Fênix Empreendimentos
              </Text>
              <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                Inovação e Excelência
              </Badge>
            </VStack>
          </Flex>
        </VStack>

        {/* Título Principal */}
        <Heading color="brand.primary" size="2xl" lineHeight="1.3">
          <Flex align="center" gap={3} justify="center" wrap="wrap">
            <Icon as={FaPizzaSlice} boxSize={8} color="brand.pizza" />
            Bem-vindo à Pizzaria Express
          </Flex>
        </Heading>

        {/* Descrição */}
        <Text color="brand.medium" fontSize="lg" lineHeight="1.6">
          Descubra as melhores pizzas artesanais feitas com ingredientes frescos{" "}
          <Icon as={FaLeaf} boxSize={5} color="brand.fresh" /> e preparadas em
          nosso tradicional forno a lenha{" "}
          <Icon as={FaFire} boxSize={5} color="brand.pizza" />.
        </Text>

        {/* Botão de Ação */}
        <Button
          bg="brand.primary"
          color="white"
          size="lg"
          px={8}
          py={6}
          borderRadius="lg"
          fontSize="lg"
          fontWeight="semibold"
          _hover={{
            bg: "brand.accent",
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
          transition="all 0.2s"
          onClick={handleNavigateToWelcome}
        >
          Explorar Cardápio
        </Button>

        {/* Rodapé elegante */}
        <Text color="brand.medium" fontSize="sm" opacity={0.8} mt={4}>
          Uma experiência gastronômica única pela Fênix Empreendimentos
        </Text>
      </VStack>
    </Box>
  );
}
