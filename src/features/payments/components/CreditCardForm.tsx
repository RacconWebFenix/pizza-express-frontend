// src/features/payments/components/CreditCardForm.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, VStack, HStack, Text, Button } from "@chakra-ui/react";
import {
  useStripe as useStripeElements,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { useStripe } from "../contexts/StripeContext";
import { usePayment } from "../hooks/usePayment";
import { toaster } from "@/components/ui/toaster";

// Componentes Field customizados para Chakra UI 3.x
interface FieldRootProps extends React.ComponentProps<typeof Box> {
  children?: React.ReactNode;
}

interface FieldLabelProps extends React.ComponentProps<typeof Text> {
  children?: React.ReactNode;
}

interface FieldErrorTextProps extends React.ComponentProps<typeof Text> {
  children?: React.ReactNode;
}

const Field = {
  Root: ({ children, ...props }: FieldRootProps) => (
    <Box {...props}>{children}</Box>
  ),
  Label: ({ children, ...props }: FieldLabelProps) => (
    <Text as="label" fontWeight="medium" mb={1} {...props}>
      {children}
    </Text>
  ),
  ErrorText: ({ children, ...props }: FieldErrorTextProps) => (
    <Text color="red.500" fontSize="sm" {...props}>
      {children}
    </Text>
  ),
};

interface CreditCardFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
}

const CreditCardFormContent: React.FC<CreditCardFormProps> = ({
  amount,
  onSuccess,
  onCancel,
}) => {
  const stripe = useStripeElements();
  const elements = useElements();
  const { paymentIntent, isLoading } = usePayment();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !paymentIntent) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        toaster.create({
          title: "Erro no pagamento",
          description: error.message || "Erro desconhecido",
          type: "error",
        });
      } else {
        toaster.create({
          title: "Pagamento realizado!",
          description: "Seu pagamento foi processado com sucesso.",
          type: "success",
        });
        onSuccess(paymentIntent.id);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      toaster.create({
        title: "Erro no pagamento",
        description: message,
        type: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSimulatePayment = () => {
    // Simulação para desenvolvimento
    const mockPaymentIntentId = `pi_mock_${Date.now()}`;
    toaster.create({
      title: "Pagamento Simulado!",
      description: "Em produção, isso seria processado pelo Stripe.",
      type: "success",
    });
    onSuccess(mockPaymentIntentId);
  };

  return (
    <Box p={6} maxW="600px" mx="auto">
      <VStack gap={6} align="stretch">
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Pagamento com Cartão
          </Text>
          <Text fontSize="lg" color="gray.600">
            Valor: R$ {(amount / 100).toFixed(2)}
          </Text>
        </Box>

        {/* Elemento de pagamento seguro do Stripe */}
        <Box as="form" onSubmit={handleSubmit}>
          <VStack gap={4} align="stretch">
            <Field.Root>
              <Field.Label>Informações do Cartão</Field.Label>
              <Box
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
                minH="120px"
                bg="white"
                style={{ pointerEvents: "auto" }}
              >
                <PaymentElement
                  options={{
                    layout: "auto",
                  }}
                />
              </Box>
            </Field.Root>

            <Box
              p={4}
              bg="blue.50"
              borderRadius="md"
              border="1px solid"
              borderColor="blue.200"
            >
              <Text fontSize="sm" color="blue.800">
                🔒 Stripe Elements garante que os dados do cartão nunca tocam
                seu servidor. O processamento é feito diretamente com o Stripe.
              </Text>
            </Box>

            <HStack gap={4} pt={4}>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                flex={1}
                disabled={isProcessing || isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                flex={1}
                loading={isProcessing || isLoading}
                loadingText="Processando..."
                disabled={!stripe || !paymentIntent}
              >
                Pagar R$ {(amount / 100).toFixed(2)}
              </Button>
              {!paymentIntent && (
                <Button
                  type="button"
                  variant="outline"
                  colorScheme="orange"
                  onClick={handleSimulatePayment}
                  flex={1}
                >
                  Simular Pagamento
                </Button>
              )}
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export const CreditCardForm: React.FC<CreditCardFormProps> = (props) => {
  const { paymentIntent, createPaymentIntent, isLoading } = usePayment();
  const { stripe } = useStripe();
  const hasCreatedIntent = useRef(false);

  // Criar PaymentIntent quando o componente montar (uma única vez)
  useEffect(() => {
    if (!hasCreatedIntent.current && !paymentIntent && !isLoading) {
      hasCreatedIntent.current = true;
      createPaymentIntent(props.amount).catch((error) => {
        console.error("Erro ao criar PaymentIntent:", error);
        toaster.create({
          title: "Erro",
          description:
            "Não foi possível preparar o pagamento. Tente novamente.",
          type: "error",
        });
      });
    }
  }, [paymentIntent, createPaymentIntent, isLoading, props.amount]);

  if (!stripe) {
    return (
      <Box p={6} textAlign="center">
        <Text color="red.500">
          Erro: Stripe não foi inicializado. Verifique a chave
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
        </Text>
      </Box>
    );
  }

  if (!paymentIntent) {
    return (
      <Box p={6} textAlign="center">
        <Text>Preparando pagamento...</Text>
        <Text fontSize="sm" color="gray.500" mt={2}>
          Criando PaymentIntent no servidor...
        </Text>
      </Box>
    );
  }

  return (
    <Elements
      stripe={stripe}
      options={{
        clientSecret: paymentIntent.client_secret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#007bff",
            colorBackground: "#ffffff",
            colorText: "#30313d",
            colorDanger: "#df1b41",
            fontFamily: "Ideal Sans, system-ui, sans-serif",
            spacingUnit: "2px",
            borderRadius: "6px",
          },
        },
        locale: "pt-BR",
      }}
    >
      <CreditCardFormContent {...props} />
    </Elements>
  );
};
