"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../components/auth/auth-context";
import { pizzaExpressSystem } from "../theme/system";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ChakraProvider value={pizzaExpressSystem}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {props.children}
        </ThemeProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}
