// src/features/payments/types/payment.ts

export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface CardData {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}

export interface PaymentData {
  paymentIntentId: string;
  amount: number;
  currency: string;
}

export interface StripeError {
  type: string;
  code?: string;
  message: string;
}

export type CardType =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "diners"
  | "jcb"
  | "unknown";
