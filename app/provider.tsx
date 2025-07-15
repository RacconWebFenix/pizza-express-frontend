"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../components/auth/auth-context";
import { pizzaExpressSystem } from "../theme/system";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ChakraProvider value={pizzaExpressSystem}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <CartProvider>{props.children}</CartProvider>
          <Toaster />
        </ThemeProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}
