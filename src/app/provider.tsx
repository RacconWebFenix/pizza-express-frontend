"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { pizzaExpressSystem } from "@/theme/system";
import { ThemeProvider } from "next-themes";

import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/features/auth/contexts/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={pizzaExpressSystem}>
      <AuthProvider>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <CartProvider>{children}</CartProvider>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
