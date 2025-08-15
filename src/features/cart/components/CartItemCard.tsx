"use client";

import { Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { CartItem } from "@/types";
import { useCart } from "@/features/cart/context/CartContext";
import { formatCurrency } from "@/utils/format";
import { PizzaButton } from "@/components/ui";

interface CartItemCardProps {
  item: CartItem;
}

/**
 * @component CartItemCard
 * @description Card que exibe um único item dentro do modal do carrinho.
 */
const CartItemCard = ({ item }: CartItemCardProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.pizza.id.toString(), item.quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(item.pizza.id.toString(), item.quantity - 1);
  };

  return (
    <Flex
      key={item.pizza.id}
      alignItems="center"
      justifyContent="space-between"
      p={3}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="md"
      w="100%"
    >
      <HStack gap={4}>
        <Image
          src={item.pizza.image || "/placeholder-image.png"}
          alt={`Imagem da pizza ${item.pizza.nome}`}
          boxSize="60px"
          objectFit="cover"
          borderRadius="md"
        />
        <VStack alignItems="flex-start" gap={0}>
          <Text fontWeight="bold">{item.pizza.nome}</Text>
          <Text fontSize="sm" color="gray.500">
            {formatCurrency(item.pizza.preco)}
          </Text>
        </VStack>
      </HStack>

      {/* Controlador de Quantidade Customizado */}
      <HStack gap={4}>
        <HStack>
          <PizzaButton
            size="md"
            onClick={handleDecrease}
            aria-label="Diminuir quantidade"
          >
            -
          </PizzaButton>
          <Text w="40px" textAlign="center" fontWeight="bold">
            {item.quantity}
          </Text>
          <PizzaButton
            size="md"
            onClick={handleIncrease}
            aria-label="Aumentar quantidade"
          >
            +
          </PizzaButton>
        </HStack>
        <Text fontWeight="bold" minW="70px" textAlign="right">
          {formatCurrency(item.pizza.preco * item.quantity)}
        </Text>
        <PizzaButton
          aria-label="Remover item do carrinho"
          color="red.500"
          variant="solid"
          onClick={() => removeFromCart(item.pizza.id.toString())}
        />
      </HStack>
    </Flex>
  );
};

export default CartItemCard;
