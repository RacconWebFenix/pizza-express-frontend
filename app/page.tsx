"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaPizzaSlice } from "react-icons/fa";
import { useColorMode as usePizzaColorMode } from "../components/ui/color-mode";

export default function Home() {
  const { colorMode, toggleColorMode } = usePizzaColorMode();
  return (
    <Box minH="100vh" bg="brand.50" _dark={{ bg: "brand.900" }} py={16} px={4}>
      <VStack align="center">
        <Icon as={FaPizzaSlice} boxSize={16} color="tomato.500" />
        <Heading
          size="2xl"
          color="brand.700"
          _dark={{ color: "cheese.500" }}
          fontFamily="heading"
        >
          Bem-vindo ao Pizza Express!
        </Heading>
        <Text fontSize="xl" color="basil.500" fontFamily="body">
          O sabor da Itália direto para sua casa.
        </Text>
        <HStack>
          <Button colorScheme="brand" size="lg">
            Fazer Pedido
          </Button>
          <Button
            variant="outline"
            colorScheme="tomato"
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? "Modo Escuro" : "Modo Claro"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
