"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { pizzaExpressSystem } from "@/theme/system";
import { ThemeProvider } from "next-themes";

import { CartProvider } from "@/features/cart/context/CartContext";

import { AuthProvider } from "@/features/auth/contexts/AuthContext";
import { StripeProvider } from "@/features/payments/contexts/StripeContext";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={pizzaExpressSystem}>
      <AuthProvider>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <StripeProvider>
            <CartProvider>{children}</CartProvider>
            <Toaster />
          </StripeProvider>
        </ThemeProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
