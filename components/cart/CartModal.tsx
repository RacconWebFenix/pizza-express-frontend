"use client";

import { VStack, Text, Flex, Box } from "@chakra-ui/react";
import { PizzaModal, PizzaButton } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";

import CartItemCard from "./CartItemCard";
import { formatCurrency } from "@/utils/format";
import { toaster } from "../ui/toaster";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @component CartModal
 * @description Modal que exibe o conteúdo do carrinho de compras.
 */
const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { cart, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // await createOrder(cart.items, cart.totalPrice);

      toaster.create({
        title: "Pedido realizado com sucesso!",
        description: "O seu pedido foi enviado para a cozinha.",
        type: "success",
      });

      clearCart(); // Limpa o carrinho após o sucesso
      onClose(); // Fecha o modal
      router.push("/pedidos"); // Redireciona para a página de pedidos
    } catch (error) {
      toaster.create({
        title: "Erro ao finalizar pedido",
        description:
          typeof error === "object" && error !== null && "message" in error
            ? String((error as { message?: string }).message)
            : "Não foi possível completar o seu pedido. Tente novamente.",
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PizzaModal isOpen={isOpen} onClose={onClose} title="Meu Carrinho">
      {/* O conteúdo do modal é agora um único VStack */}
      <VStack p={6} gap={4} alignItems="stretch">
        {cart.items.length > 0 ? (
          <VStack gap={4}>
            {cart.items.map((item) => (
              <CartItemCard key={item.pizza.id} item={item} />
            ))}
          </VStack>
        ) : (
          <Text textAlign="center" py={8}>
            O seu carrinho está vazio.
          </Text>
        )}

        {/* Rodapé renderizado condicionalmente */}
        {cart.items.length > 0 && (
          <VStack as="footer" pt={4} gap={3} alignItems="stretch">
            {/* Divisor manual */}
            <Box h="1px" bg="gray.200" my={2} />

            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="lg" fontWeight="bold">
                Total:
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="green.500">
                {formatCurrency(cart.totalPrice)}
              </Text>
            </Flex>
            <VStack mt={4} gap={3}>
              <PizzaButton
                color="green"
                loading={isLoading}
                onClick={handleCheckout}
                w="100%"
              >
                Finalizar Pedido
              </PizzaButton>
              <PizzaButton
                variant="outline"
                color="red"
                onClick={clearCart}
                w="100%"
                disabled={isLoading}
              >
                Esvaziar Carrinho
              </PizzaButton>
            </VStack>
          </VStack>
        )}
      </VStack>
    </PizzaModal>
  );
};

export default CartModal;
