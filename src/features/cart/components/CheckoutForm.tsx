"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Heading,
  Separator,
  useDisclosure,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { EnderecoModal } from "@/features/profile/components/EnderecoModal";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { createPedido } from "@/features/pedidos/services/pedidosService";
import { toaster } from "@/components/ui/toaster";
import { Endereco } from "@/types/endereco";

interface CheckoutFormProps {
  onClose: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose }) => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const { open: isEnderecoModalOpen, onOpen: onOpenEnderecoModal, onClose: onCloseEnderecoModal } = useDisclosure();
  const [selectedEndereco, setSelectedEndereco] = useState<Endereco | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

    "use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Heading,
  Separator,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { createPedido } from "@/features/pedidos/services/pedidosService";
import { toaster } from "@/components/ui/toaster";

interface CheckoutFormProps {
  onClose: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose }) => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = async () => {
    if (!user) {
      toaster.create({
        title: "Erro",
        description: "Usuário não autenticado.",
        type: "error",
      });
      return;
    }

    // TODO: implementar seleção de endereço
    const enderecoId = 1; // placeholder

    setIsSubmitting(true);
    try {
      const orderData = {
        clienteId: user.id,
        enderecoId,
        pizzasIds: cart.items.flatMap((item) => Array(item.quantity).fill(item.pizza.id)),
      };

      await createPedido(orderData);
      toaster.create({
        title: "Pedido realizado!",
        description: "Seu pedido foi enviado com sucesso.",
        type: "success",
      });
      clearCart();
      onClose();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Falha ao criar pedido. Tente novamente.";
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Finalizar Pedido
      </Heading>

      <VStack align="stretch" gap={4}>
        <Box>
          <Heading size="md" mb={2}>
            Resumo do Pedido
          </Heading>
          {cart.items.map((item) => (
            <Text key={item.pizza.id}>
              {item.quantity}x {item.pizza.nome} - R$ {(item.pizza.preco * item.quantity).toFixed(2)}
            </Text>
          ))}
          <Separator my={2} />
          <Text fontWeight="bold">Total: R$ {cart.totalPrice.toFixed(2)}</Text>
        </Box>

        <Text color="gray.500" fontSize="sm">
          TODO: Seleção de endereço de entrega
        </Text>

        <Button
          colorScheme="green"
          onClick={handleSubmitOrder}
          loading={isSubmitting}
          loadingText="Enviando pedido..."
        >
          Confirmar Pedido
        </Button>
      </VStack>
    </Box>
  );
};

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Finalizar Pedido
      </Heading>

      <VStack align="stretch" gap={4}>
        <Box>
          <Heading size="md" mb={2}>
            Resumo do Pedido
          </Heading>
          {cart.items.map((item) => (
            <Text key={item.pizza.id}>
              {item.quantity}x {item.pizza.nome} - R$ {(item.pizza.preco * item.quantity).toFixed(2)}
            </Text>
          ))}
          <Divider my={2} />
          <Text fontWeight="bold">Total: R$ {cart.totalPrice.toFixed(2)}</Text>
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            Endereço de Entrega
          </Heading>
          {selectedEndereco ? (
            <Text>{selectedEndereco.logradouro}, {selectedEndereco.numero} - {selectedEndereco.bairro}</Text>
          ) : (
            <Text color="gray.500">Nenhum endereço selecionado</Text>
          )}
          <Button mt={2} onClick={onOpenEnderecoModal}>
            Selecionar Endereço
          </Button>
        </Box>

        <Button
          colorScheme="green"
          onClick={handleSubmitOrder}
          isLoading={isSubmitting}
          loadingText="Enviando pedido..."
        >
          Confirmar Pedido
        </Button>
      </VStack>

      <EnderecoModal
        isOpen={isEnderecoModalOpen}
        onClose={onCloseEnderecoModal}
        onSave={async (data) => {
          // TODO: implementar seleção de endereço existente
          setSelectedEndereco(data);
          onCloseEnderecoModal();
        }}
      />
    </Box>
  );
};
