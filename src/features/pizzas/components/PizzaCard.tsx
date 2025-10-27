"use client";

import { AspectRatio, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

import { Pizza } from "@/types/pizzas";
import { formatCurrency } from "@/utils/format";
import { PizzaButton } from "@/components/ui";
import { usePermissions } from "@/hooks/usePermissions";

// O componente agora só precisa saber como é uma Pizza
interface PizzaCardProps {
  pizza: Pizza;
  onAddToCart: (pizzaId: number) => void; // Função para adicionar ao carrinho (a ser implementada no futuro)
}

export const PizzaCard = ({ pizza, onAddToCart }: PizzaCardProps) => {
  const { isCliente } = usePermissions();

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="lg"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.02)" }}
    >
      <AspectRatio ratio={16 / 9}>
        <Image
          src={pizza.image || "/default-pizza.png"}
          alt={`Pizza ${pizza.nome}`}
          objectFit="cover"
        />
      </AspectRatio>

      <Box p={5}>
        <Heading size="md" mb={2}>
          {pizza.nome}
        </Heading>
        <Text fontSize="sm" color="gray.600" lineClamp={3} minH="60px">
          {pizza.descricao}
        </Text>
      </Box>

      <Flex borderTopWidth="1px" p={4} justify="space-between" align="center">
        <Text fontWeight="bold" fontSize="xl" color="green.500">
          {formatCurrency(pizza.preco)}
        </Text>
        {isCliente() && (
          <PizzaButton onClick={() => onAddToCart(Number(pizza.id))}>
            Adicionar
          </PizzaButton>
        )}
      </Flex>
    </Box>
  );
};
