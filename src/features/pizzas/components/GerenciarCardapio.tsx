"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Text,
  AspectRatio,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { TbArrowBack } from "react-icons/tb";

import { formatCurrency } from "@/utils/format";

import { UsePizzasReturn } from "../hooks/usePizzas";
import { PizzaButton, PizzaLoading } from "@/components/ui";

const MotionBox = motion(Box);

interface GerenciarCardapioProps {
  onNavigateBack: () => void;
  pizzaHook: Pick<
    UsePizzasReturn,
    "pizzas" | "isLoading" | "handleDelete" | "handleOpenFormModal"
  >;
}

export const GerenciarCardapio = ({
  onNavigateBack,
  pizzaHook,
}: GerenciarCardapioProps) => {
  const { pizzas, isLoading, handleDelete, handleOpenFormModal } = pizzaHook;

  if (isLoading) {
    return <PizzaLoading />;
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      w="full"
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Button onClick={onNavigateBack} variant="ghost">
          <Icon as={TbArrowBack} mr="2" />
          Voltar ao Dashboard
        </Button>

        <Heading size="lg">Gerenciar Cardápio</Heading>

        <PizzaButton onClick={() => handleOpenFormModal()}>
          <Flex align="center" gap="2">
            <PlusCircle size={20} />
            <Text>Nova Pizza</Text>
          </Flex>
        </PizzaButton>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {pizzas.map((pizza) => (
          <Box
            key={pizza.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            shadow="md"
          >
            <AspectRatio ratio={16 / 9}>
              <Image
                src={pizza.image || "/default-pizza.png"}
                alt={pizza.nome}
                objectFit="cover"
              />
            </AspectRatio>
            <Box p={4}>
              <Heading size="md">{pizza.nome}</Heading>
              <Text fontSize="sm" color="gray.500" lineClamp={2} minH="40px">
                {pizza.descricao}
              </Text>
              <Text fontWeight="bold" fontSize="lg" color="green.500" mt={2}>
                {formatCurrency(pizza.preco)}
              </Text>
            </Box>
            <HStack borderTopWidth="1px" p={2} gap={3}>
              <Button
                variant="solid"
                bg="green.600"
                color="white"
                size="sm"
                flex={1}
                _hover={{ bg: "green.700" }}
                onClick={() => handleOpenFormModal(pizza)}
              >
                Editar
              </Button>
              <Button
                variant="outline"
                colorScheme="red"
                size="sm"
                borderColor="red.500"
                color="red.600"
                flex={1}
                _hover={{
                  bg: "transparent",
                  borderColor: "red.700",
                  color: "red.700",
                }}
                onClick={() => handleDelete(Number(pizza.id))}
              >
                Remover
              </Button>
            </HStack>
          </Box>
        ))}
      </Grid>
    </MotionBox>
  );
};
