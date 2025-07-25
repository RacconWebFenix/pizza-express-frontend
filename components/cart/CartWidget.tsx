"use client";

import { Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/contexts/CartContext";
import CartModal from "./CartModal";
// Futuramente, importaremos o modal do carrinho aqui
// import CartModal from './CartModal';

/**
 * @component CartWidget
 * @description Ícone do carrinho de compras que exibe a quantidade de itens
 * e abre o modal do carrinho ao ser clicado.
 */
const CartWidget = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart(); // 1. Obtenha os dados e funções do contexto
  const { open, onOpen, onClose } = useDisclosure();

  // 2. Crie uma função para o checkout (pode ser mais complexa no futuro)
  const handleCheckout = () => {
    alert("Pedido finalizado!");
    clearCart();
    onClose();
  };

  // 3. Transforme os itens do carrinho para o formato que o CartModal espera
  const modalCartItems = cart.items.map((item) => ({
    id: item.pizza.id,
    name: item.pizza.nome,
    price: item.pizza.preco,
    quantity: item.quantity,
  }));

  return (
    <>
      <Flex
        as="button"
        alignItems="center"
        position="relative"
        onClick={onOpen} // Ação de clique para abrir o modal
        aria-label={`Abrir carrinho de compras com ${cart.totalItems} itens`}
        p={2}
        bg="gray.500"
        borderRadius="md"
        _hover={{ bg: "gray.700" }}
        transition="background-color 0.2s"
      >
        <Icon as={FaShoppingCart} w={6} h={6} color="white" />
        {cart.totalItems > 0 && (
          <Flex
            position="absolute"
            top="-1"
            right="-1"
            as="span"
            justifyContent="center"
            alignItems="center"
            w={5}
            h={5}
            bg="red.500"
            borderRadius="full"
            fontSize="xs"
            color="white"
            fontWeight="bold"
          >
            <Text>{cart.totalItems}</Text>
          </Flex>
        )}
      </Flex>

      <CartModal
        isOpen={open}
        onClose={onClose}
        cartItems={modalCartItems}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        onUpdateQuantity={updateQuantity}
      />
    </>
  );
};

export default CartWidget;
