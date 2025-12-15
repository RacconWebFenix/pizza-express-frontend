"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { pizzaExpressSystem } from "@/theme/system";
import { ThemeProvider } from "next-themes";

import { CartProvider } from "@/features/cart/context/CartContext";

import { AuthProvider } from "@/features/auth/contexts/AuthContext";
import { StripeProvider } from "@/features/payments/contexts/StripeContext";
import { CategoriasProvider } from "@/features/categorias/contexts/CategoriasContext";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={pizzaExpressSystem}>
      <AuthProvider>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <StripeProvider>
            <CategoriasProvider>
              <CartProvider>{children}</CartProvider>
              <Toaster />
            </CategoriasProvider>
          </StripeProvider>
        </ThemeProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
