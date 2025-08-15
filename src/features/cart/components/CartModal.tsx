import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Separator,
  Portal,
  IconButton,
} from "@chakra-ui/react";
import { IoMdClose, IoMdTrash, IoMdAdd, IoMdRemove } from "react-icons/io";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (itemId: number) => void;
  onCheckout: () => void;
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onCheckout,
  onUpdateQuantity,
}) => {
  if (!isOpen) return null;

  const total = (cartItems || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Portal>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.600"
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex={1000}
        onClick={onClose}
      >
        <Box
          bg="white"
          p={8}
          borderRadius="xl"
          width="90%"
          maxWidth="500px"
          boxShadow="2xl"
          position="relative"
          onClick={(e) => e.stopPropagation()}
          _dark={{
            bg: "gray.800",
            color: "white",
          }}
        >
          {/* Header */}
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg" color="gray.800" _dark={{ color: "white" }}>
              Seu Carrinho
            </Heading>
            <IconButton
              aria-label="Fechar carrinho"
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <IoMdClose />
            </IconButton>
          </Flex>

          {/* Content */}
          {!cartItems || cartItems.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Text color="gray.500" fontSize="lg">
                Seu carrinho está vazio.
              </Text>
            </Box>
          ) : (
            <VStack gap={4} align="stretch">
              {/* Cart Items */}
              {(cartItems || []).map((item, index) => (
                <Box key={item.id}>
                  <HStack justify="space-between" align="center" py={3}>
                    <VStack align="start" gap={2} flex={1}>
                      <Text
                        fontWeight="medium"
                        color="gray.800"
                        _dark={{ color: "white" }}
                      >
                        {item.name}
                      </Text>
                      {/* ALTERADO: Forma de passar o ícone corrigida */}
                      <HStack>
                        <IconButton
                          aria-label="Diminuir quantidade"
                          size="xs"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <IoMdRemove />
                        </IconButton>
                        <Text
                          w="40px"
                          textAlign="center"
                          fontSize="md"
                          fontWeight="bold"
                        >
                          {item.quantity}
                        </Text>
                        <IconButton
                          aria-label="Aumentar quantidade"
                          size="xs"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <IoMdAdd />
                        </IconButton>
                      </HStack>
                    </VStack>
                    <HStack spaceX={3}>
                      <Text
                        fontWeight="bold"
                        color="green.600"
                        _dark={{ color: "green.400" }}
                      >
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </Text>
                      <IconButton
                        aria-label="Remover item"
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <IoMdTrash />
                      </IconButton>
                    </HStack>
                  </HStack>
                  {index < cartItems.length - 1 && <Separator />}
                </Box>
              ))}

              {/* Total */}
              <Box pt={4}>
                <Separator mb={4} />
                <HStack justify="space-between">
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color="gray.800"
                    _dark={{ color: "white" }}
                  >
                    Total:
                  </Text>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color="green.600"
                    _dark={{ color: "green.400" }}
                  >
                    R$ {total.toFixed(2)}
                  </Text>
                </HStack>
              </Box>
            </VStack>
          )}

          {/* Footer */}
          <Box mt={8}>
            <ButtonGroup width="full" spaceX={3}>
              <Button
                variant="outline"
                colorScheme="gray"
                onClick={onClose}
                flex={1}
                size="lg"
              >
                Continuar Comprando
              </Button>
              <Button
                variant="solid"
                colorScheme="green"
                onClick={onCheckout}
                disabled={!cartItems || cartItems.length === 0}
                flex={1}
                size="lg"
                _disabled={{
                  opacity: 0.6,
                  cursor: "not-allowed",
                }}
              >
                Finalizar Pedido
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </Portal>
  );
};
export default CartModal;
