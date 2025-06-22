"use client";

import {
  Box,
  Heading,
  VStack,
  Image,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAuth } from "../../components/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPizzas } from "../../services/pizza-service";

interface Pizza {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
}

const WelcomePage = () => {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const data = await getPizzas();
        setPizzas(data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgGradient="linear(to-br, brand.yellow, brand.red)"
      >
        <VStack
          gap={6}
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="xl"
          maxWidth="600px"
          w="full"
          m={4}
        >
          <VStack gap={2}>
            <Heading color="brand.red" size="lg" textAlign="center">
              Bem-vindo ao Pizza Express!
            </Heading>
            {user && (
              <Text color="brand.charcoal" fontSize="lg" fontWeight="medium">
                Olá, {user.email}!
              </Text>
            )}
          </VStack>

          <Box
            bg="white"
            p={4}
            borderRadius="full"
            boxShadow="md"
            _hover={{ transform: "rotate(10deg)" }}
            transition="transform 0.3s ease"
          >
            <Image
              src="/pizza-icon.svg"
              alt="Ícone de Pizza"
              boxSize="120px"
              objectFit="contain"
            />
          </Box>

          <Button
            bg="brand.red"
            color="white"
            _hover={{ bg: "brand.charcoal" }}
            onClick={handleLogout}
            width="full"
            size="lg"
            fontWeight="bold"
          >
            Sair
          </Button>

          <VStack w="full" pt={4} align="flex-start" gap={4}>
            <Heading size="md" color="brand.charcoal">
              Nosso Cardápio
            </Heading>

            {isLoading ? (
              <Box w="full" display="flex" justifyContent="center" p={8}>
                <Spinner size="xl" color="brand.red" />
              </Box>
            ) : (
              <>
                {pizzas.map((pizza) => (
                  <Box
                    key={pizza.id}
                    p={6}
                    borderWidth="2px"
                    borderRadius="xl"
                    boxShadow="lg"
                    bg="brand.cream"
                    w="full"
                    transition="all 0.2s"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "xl",
                    }}
                  >
                    <VStack align="flex-start" gap={2}>
                      <Heading size="md" color="brand.red">
                        {pizza.nome}
                      </Heading>
                      <Text color="brand.charcoal" fontSize="md">
                        {pizza.descricao}
                      </Text>
                      <Text
                        color="brand.green"
                        fontSize="lg"
                        fontWeight="bold"
                        alignSelf="flex-end"
                      >
                        R$ {pizza.preco.toFixed(2)}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </>
            )}
          </VStack>
        </VStack>
      </Box>
    </motion.div>
  );
};

export default WelcomePage;
