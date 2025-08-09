"use client";

import { Box, Flex, Icon, VStack, Image, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaPizzaSlice, FaLeaf, FaFire } from "react-icons/fa";
import { useAuth } from "../components/auth/auth-context";
import AuthLoading from "../components/auth/AuthLoading";
import { useEffect } from "react";
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
      bgGradient="linear(to-br, yellow.100, orange.100)"
      minH="100vh"
      p={{ base: 6, md: 12 }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        gap={{ base: 6, md: 8 }}
        align="center"
        maxW="700px"
        textAlign="center"
        px={4}
      >
        {/* Logo e Branding da Fênix */}
        <VStack gap={3}>
          <Flex align="center" gap={4}>
            <Box>
              <Image
                src="/fenix3.jpeg"
                boxSize={{ base: "120px", md: "150px" }}
                borderRadius="full"
                fit="cover"
                alt="Logo da Fênix Empreendimentos"
                loading="lazy"
              />
            </Box>
            <VStack align="flex-start" gap={1}>
              <PizzaText
                fontSize={{ base: "md", md: "lg" }}
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
        <Flex
          align="center"
          gap={3}
          justify="center"
          wrap="wrap"
          aria-label="Bem-vindo à Pizzaria Express"
        >
          <Icon
            as={FaPizzaSlice}
            boxSize={{ base: 6, md: 8 }}
            color="orange.600"
            aria-hidden="true"
            transition="transform 0.3s ease"
            _hover={{ transform: "rotate(15deg)" }}
          />
          <PizzaText
            variant="heading"
            color="brand.primary"
            lineHeight="1.3"
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            Bem-vindo à Pizzaria Express
          </PizzaText>
        </Flex>

        {/* Descrição */}
        <PizzaText color="gray.300" fontSize={{ base: "md", md: "lg" }} lineHeight="1.6">
          Descubra as melhores pizzas artesanais, feitas com ingredientes frescos{" "}
          <Icon as={FaLeaf} boxSize={5} color="green.600" aria-hidden="true" /> e
          assadas em nosso tradicional forno a lenha{" "}
          <Icon as={FaFire} boxSize={5} color="orange.600" aria-hidden="true" />
          , garantindo sabor e qualidade excepcionais.
        </PizzaText>

        {/* Botão de Ação */}
        <Button
          variant="solid"
          size="lg"
          px={{ base: 6, md: 8 }}
          py={{ base: 4, md: 6 }}
          borderRadius="lg"
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="semibold"
          colorScheme="orange"
          onClick={handleNavigateToWelcome}
          _hover={{ bg: "orange.500", transform: "scale(1.05)" }}
          transition="all 0.3s ease"
          aria-label="Explorar Cardápio"
        >
          Explorar Cardápio
        </Button>

        {/* Rodapé elegante */}
        <PizzaText color="gray.400" fontSize="sm" opacity={0.8} mt={6}>
          Uma experiência gastronômica única pela Fênix Empreendimentos
        </PizzaText>
      </VStack>
    </Box>
  );
}
