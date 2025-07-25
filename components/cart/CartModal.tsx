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
import { IoMdClose, IoMdTrash } from "react-icons/io";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const total = (cartItems || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log(cartItems);
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
              colorPalette="gray"
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
                    <VStack align="start" gap={1} flex={1}>
                      <Text
                        fontWeight="medium"
                        color="gray.800"
                        _dark={{ color: "white" }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.300" }}
                      >
                        Quantidade: {item.quantity}
                      </Text>
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
                        colorPalette="red"
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
                colorPalette="gray"
                onClick={onClose}
                flex={1}
                size="lg"
              >
                Continuar Comprando
              </Button>
              <Button
                variant="solid"
                colorPalette="green"
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
