"use client";

import { SimpleGrid, Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { PizzaCard } from "./PizzaCard";
import { PizzaText, PizzaLoading } from "../ui";
import { Pizza } from "../../types";

const MotionBox = motion(Box);

interface PizzaGalleryProps {
  pizzas: Pizza[];
  isLoading: boolean;
  error: string | null;
  onPedir: (pizzaId: string, pizzaNome: string) => void;
  title?: string;
  emptyMessage?: string;
}

/**
 * Galeria de pizzas com imagens em grid responsivo
 * Exibe as pizzas com suas respectivas imagens em cards visuais
 */
export function PizzaGallery({
  pizzas,
  isLoading,
  error,
  onPedir,
  title = "🍕 Nosso Cardápio",
  emptyMessage = "Nenhuma pizza encontrada",
}: PizzaGalleryProps) {
  if (isLoading) {
    return (
      <VStack gap={6} py={8}>
        <PizzaText variant="heading" fontSize="2xl" textAlign="center">
          {title}
        </PizzaText>
        <PizzaLoading
          isVisible={true}
          message="Carregando pizzas..."
          size="lg"
        />
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack gap={4} py={8}>
        <PizzaText variant="heading" fontSize="2xl" textAlign="center">
          {title}
        </PizzaText>
        <Box
          p={6}
          bg="red.50"
          border="1px solid"
          borderColor="red.200"
          borderRadius="lg"
          textAlign="center"
        >
          <PizzaText color="red.700" fontSize="lg">
            ❌ {error}
          </PizzaText>
        </Box>
      </VStack>
    );
  }

  if (pizzas.length === 0) {
    return (
      <VStack gap={4} py={8}>
        <PizzaText variant="heading" fontSize="2xl" textAlign="center">
          {title}
        </PizzaText>
        <Box
          p={6}
          bg="gray.50"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
          textAlign="center"
        >
          <PizzaText color="gray.600" fontSize="lg">
            🍕 {emptyMessage}
          </PizzaText>
        </Box>
      </VStack>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <VStack gap={8} py={6}>
        {/* Título da galeria */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PizzaText
            variant="heading"
            fontSize="3xl"
            textAlign="center"
            color="brand.primary"
            fontWeight="bold"
          >
            {title}
          </PizzaText>
          <PizzaText
            variant="body"
            textAlign="center"
            color="gray.600"
            fontSize="lg"
            mt={2}
          >
            Escolha sua pizza favorita com ingredientes frescos e sabor
            incomparável
          </PizzaText>
        </MotionBox>

        {/* Grid de pizzas */}
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
            xl: 4,
          }}
          gap={6}
          w="full"
          maxW="1400px"
          mx="auto"
          px={4}
        >
          {pizzas.map((pizza, index) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              index={index}
              onPedir={onPedir}
            />
          ))}
        </SimpleGrid>

        {/* Estatísticas */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <PizzaText
            variant="body"
            textAlign="center"
            color="gray.500"
            fontSize="md"
          >
            ✨ {pizzas.length} pizzas disponíveis • Todas feitas com
            ingredientes frescos
          </PizzaText>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
}
