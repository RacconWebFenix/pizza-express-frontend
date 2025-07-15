"use client";

import {  Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
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
  const { cart } = useCart();
  // O useDisclosure será usado para controlar a abertura e fecho do modal
  const { open, onOpen, onClose } = useDisclosure();

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

      {/* Renderiza o Modal do Carrinho, controlando sua visibilidade */}
      <CartModal isOpen={open} onClose={onClose} />
    </>
  );
};

export default CartWidget;
