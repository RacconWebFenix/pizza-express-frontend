"use client";

import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";
import { CheckoutForm } from "./CheckoutForm";
import { AppModal } from "@/components/ui";
import { FaShoppingCart } from "react-icons/fa";

const CartWidget = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { open, onOpen, onClose } = useDisclosure();
  const {
    open: isCheckoutOpen,
    onOpen: onOpenCheckout,
    onClose: onCloseCheckout,
  } = useDisclosure();

  // --- ADICIONADO PARA DEBUG ---
  console.log("[CartWidget] Estado do carrinho recebido pelo header:", cart);
  // ----------------------------

  const handleCheckout = () => {
    onClose(); // fechar modal do carrinho
    onOpenCheckout(); // abrir checkout
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

      <AppModal
        isOpen={isCheckoutOpen}
        onClose={onCloseCheckout}
        title="Finalizar Pedido"
      >
        <CheckoutForm onClose={onCloseCheckout} />
      </AppModal>
    </>
  );
};

export default CartWidget;
