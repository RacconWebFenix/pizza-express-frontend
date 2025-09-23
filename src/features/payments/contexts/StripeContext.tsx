// src/features/payments/contexts/StripeContext.tsx

"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

interface StripeContextType {
  stripe: Stripe | null;
}

const StripeContext = createContext<StripeContextType | undefined>(undefined);

// Stripe promise - será inicializado uma vez
let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

interface StripeProviderProps {
  children: ReactNode;
}

export const StripeProvider = ({ children }: StripeProviderProps) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    getStripe().then(setStripe);
  }, []);

  return (
    <StripeContext.Provider value={{ stripe }}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (context === undefined) {
    throw new Error("useStripe must be used within a StripeProvider");
  }
  return context;
};
