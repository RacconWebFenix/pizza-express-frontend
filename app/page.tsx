"use client";

import { Box, Flex, Icon, VStack, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaPizzaSlice, FaLeaf, FaFire } from "react-icons/fa";
import { useAuth } from "../components/auth/auth-context";
import AuthLoading from "../components/auth/AuthLoading";
import { useEffect } from "react";
import { PizzaButton } from "../components/ui/PizzaButton";
import { PizzaBadge } from "../components/ui/PizzaBadge";
import { PizzaText } from "../components/ui/PizzaText";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redireciona usuários logados para o cardápio
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Use window.location para garantir redirecionamento em produção
      if (typeof window !== "undefined") {
        window.location.href = "/cardapio";
      } else {
        router.push("/cardapio");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  const handleNavigateToWelcome = () => {
    router.push("/cardapio");
  };

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return <AuthLoading message="Verificando login..." />;
  }

  return (
    <Box
      bg="yellow.100"
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
                src="/fenix3.jpeg"
                boxSize="150px"
                borderRadius="full"
                fit="cover"
                alt="Naruto Uzumaki"
              />
            </Box>
            <VStack align="flex-start" gap={1}>
              <PizzaText
                fontSize="lg"
                fontWeight="bold"
                color="brand.primary"
                lineHeight="1.2"
              >
                Fênix Empreendimentos
              </PizzaText>
              <PizzaBadge variant="success" fontSize="xs">
                Inovação e Excelência
              </PizzaBadge>
            </VStack>
          </Flex>
        </VStack>

        {/* Título Principal */}
        <Flex align="center" gap={3} justify="center" wrap="wrap">
          <Icon as={FaPizzaSlice} boxSize={8} color="orange.600" />
          <PizzaText variant="heading" color="brand.primary" lineHeight="1.3">
            Bem-vindo à Pizzaria Express
          </PizzaText>
        </Flex>

        {/* Descrição */}
        <PizzaText color="gray.800" fontSize="lg" lineHeight="1.6">
          Descubra as melhores pizzas artesanais feitas com ingredientes frescos{" "}
          <Icon as={FaLeaf} boxSize={5} color="green.600" /> e preparadas em
          nosso tradicional forno a lenha{" "}
          <Icon as={FaFire} boxSize={5} color="orange.600" />.
        </PizzaText>

        {/* Botão de Ação */}
        <PizzaButton
          variant="primary"
          size="lg"
          px={8}
          py={6}
          borderRadius="lg"
          fontSize="lg"
          fontWeight="semibold"
          onClick={handleNavigateToWelcome}
        >
          Explorar Cardápio
        </PizzaButton>

        {/* Rodapé elegante */}
        <PizzaText color="gray.800" fontSize="sm" opacity={0.8} mt={4}>
          Uma experiência gastronômica única pela Fênix Empreendimentos
        </PizzaText>
      </VStack>
    </Box>
  );
}
