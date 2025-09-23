// src/features/payments/hooks/usePayment.ts

"use client";

import { useState } from "react";
import { useStripe } from "../contexts/StripeContext";
import { stripeService } from "../services/stripeService";
import { PaymentIntent } from "../types/payment";
import { toaster } from "@/components/ui/toaster";

export const usePayment = () => {
  const { stripe } = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );

  /**
   * Cria um Payment Intent para o valor especificado
   */
  const createPaymentIntent = async (amount: number) => {
    setIsLoading(true);
    try {
      const intent = await stripeService.createPaymentIntent(amount);
      setPaymentIntent(intent);
      return intent;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar Payment Intent";
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Processa o pagamento usando Stripe Elements (melhor prática)
   */
  const processPayment = async (): Promise<{
    success: boolean;
    paymentIntentId?: string;
  }> => {
    if (!stripe || !paymentIntent) {
      throw new Error("Stripe não inicializado ou Payment Intent não criado");
    }

    setIsLoading(true);
    try {
      const { error } = await stripe.confirmPayment({
        clientSecret: paymentIntent.client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        throw new Error(error.message || "Erro no processamento do pagamento");
      }

      // Se chegou aqui sem erro, o pagamento foi bem-sucedido
      return { success: true, paymentIntentId: paymentIntent.id };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro no processamento do pagamento";
      toaster.create({
        title: "Erro no pagamento",
        description: message,
        type: "error",
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Limpa o estado do pagamento
   */
  const clearPayment = () => {
    setPaymentIntent(null);
  };

  return {
    stripe,
    paymentIntent,
    isLoading,
    createPaymentIntent,
    processPayment,
    clearPayment,
  };
};
