// src/features/payments/services/stripeService.ts

import { PaymentIntent } from "../types/payment";
import { getAuthToken } from "@/utils/cookies";
import { API_BASE_URL } from "@/config/api";

export const stripeService = {
  /**
   * Cria um Payment Intent no backend
   */
  async createPaymentIntent(amount: number): Promise<PaymentIntent> {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Usuário não autenticado.");
    }

    const response = await fetch(`${API_BASE_URL}/payments/create-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const error = await response.json().catch(() => ({ message: errorText }));
      throw new Error(error.message || "Erro ao criar Payment Intent");
    }

    const result = await response.json();
    return result;
  },
};
