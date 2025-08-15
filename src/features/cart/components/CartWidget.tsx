"use client";

import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";
import { FaShoppingCart } from "react-icons/fa";

const CartWidget = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { open, onOpen, onClose } = useDisclosure();

  // --- ADICIONADO PARA DEBUG ---
  console.log("[CartWidget] Estado do carrinho recebido pelo header:", cart);
  // ----------------------------

  const handleCheckout = () => {
    alert("Pedido finalizado!");
    clearCart();
    onClose();
  };

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
        onClick={onOpen}
      >
        <FaShoppingCart
          style={{ width: "24px", height: "24px", color: "white" }}
        />
        {cart.totalItems > 0 && (
          <Flex
            position="absolute"
            top="-8px"
            right="-8px"
            bg="red.500"
            borderRadius="full"
            w="20px"
            h="20px"
            align="center"
            justify="center"
          >
            <Text fontSize="xs" fontWeight="bold" color="white">
              {cart.totalItems}
            </Text>
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
