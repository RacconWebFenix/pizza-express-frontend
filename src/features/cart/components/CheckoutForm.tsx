"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Heading,
  Separator,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { createPedido } from "@/features/pedidos/services/pedidosService";
import { toaster } from "@/components/ui/toaster";
import { EnderecoSelectionModal } from "@/features/profile/components/EnderecoSelectionModal";
import { CreditCardForm } from "@/features/payments/components/CreditCardForm";
import type { Endereco } from "@/types/endereco";

interface CheckoutFormProps {
  onClose: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose }) => {

  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEndereco, setSelectedEndereco] = useState<Endereco | null>(
    null
  );
  const [isEnderecoModalOpen, setIsEnderecoModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Debug: verificar autenticação
  React.useEffect(() => {
    console.log("🔍 DEBUG CheckoutForm: User autenticado:", !!user);
    console.log("🔍 DEBUG CheckoutForm: User data:", user);
  }, [user]);

  const handleSubmitOrder = async () => {
    if (!user) {
      toaster.create({
        title: "Erro",
        description: "Usuário não autenticado.",
        type: "error",
      });
      return;
    }

    if (!selectedEndereco) {
      toaster.create({
        title: "Endereço obrigatório",
        description: "Selecione um endereço para entrega.",
        type: "warning",
      });
      return;
    }

    // Abrir modal de pagamento em vez de criar pedido diretamente
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async (intentId: string) => {
    setIsPaymentModalOpen(false);

    // Agora criar o pedido após pagamento aprovado
    setIsSubmitting(true);
    try {
      const orderData = {
        clienteId: user!.id,
        enderecoId: selectedEndereco!.id,
        pizzasIds: cart.items.flatMap((item) =>
          Array(item.quantity).fill(item.pizza.id)
        ),
        paymentIntentId: intentId, // Adicionar ID do pagamento
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
      const message =
        error instanceof Error
          ? error.message
          : "Falha ao criar pedido. Tente novamente.";
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentCancel = () => {
    setIsPaymentModalOpen(false);
  };

  const handleSelectEndereco = (endereco: Endereco) => {
    setSelectedEndereco(endereco);
    setIsEnderecoModalOpen(false);
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
              {item.quantity}x {item.pizza.nome} - R${" "}
              {(item.pizza.preco * item.quantity).toFixed(2)}
            </Text>
          ))}
          <Separator my={2} />
          <Text fontWeight="bold">Total: R$ {cart.totalPrice.toFixed(2)}</Text>
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            Endereço de Entrega
          </Heading>
          {selectedEndereco ? (
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              borderColor="green.300"
              bg="green.50"
            >
              <Text fontWeight="medium" color="green.700" mb={1}>
                <FaMapMarkerAlt
                  style={{ display: "inline", marginRight: "8px" }}
                />
                {selectedEndereco.tipo}{" "}
                {selectedEndereco.principal && "(Principal)"}
              </Text>
              <Text fontSize="sm" color="gray.700">
                {selectedEndereco.logradouro}, {selectedEndereco.numero}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {selectedEndereco.bairro}, {selectedEndereco.cidade}/
                {selectedEndereco.estado}
              </Text>
              <Text fontSize="sm" color="green.600" fontWeight="medium">
                CEP: {selectedEndereco.cep}
              </Text>
              <Button
                size="sm"
                variant="outline"
                colorScheme="green"
                mt={2}
                onClick={() => setIsEnderecoModalOpen(true)}
              >
                Alterar Endereço
              </Button>
            </Box>
          ) : (
            <Box
              p={4}
              borderWidth="2px"
              borderRadius="md"
              borderColor="gray.300"
              borderStyle="dashed"
              textAlign="center"
            >
              <FaMapMarkerAlt
                size={24}
                style={{ color: "gray", margin: "0 auto 8px" }}
              />
              <Text color="gray.600" mb={2}>
                Nenhum endereço selecionado
              </Text>
              <Button
                colorScheme="green"
                onClick={() => setIsEnderecoModalOpen(true)}
              >
                Selecionar Endereço
              </Button>
            </Box>
          )}
        </Box>

        <Button
          colorScheme="green"
          onClick={handleSubmitOrder}
          loading={isSubmitting}
          loadingText="Enviando pedido..."
        >
          Confirmar Pedido
        </Button>
      </VStack>

      <EnderecoSelectionModal
        isOpen={isEnderecoModalOpen}
        onClose={() => setIsEnderecoModalOpen(false)}
        onSelect={handleSelectEndereco}
        selectedEnderecoId={selectedEndereco?.id}
      />

      {/* Modal de Pagamento */}
      <DialogRoot
        open={isPaymentModalOpen}
        onOpenChange={(details) => setIsPaymentModalOpen(details.open)}
      >
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pagamento</DialogTitle>
            </DialogHeader>
            <DialogBody style={{ pointerEvents: "auto" }}>
              <CreditCardForm
                amount={Math.round(cart.totalPrice * 100)} // Converter para centavos
                onSuccess={handlePaymentSuccess}
                onCancel={handlePaymentCancel}
              />
            </DialogBody>
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </Box>
  );
};
