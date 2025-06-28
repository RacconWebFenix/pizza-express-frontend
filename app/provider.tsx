"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../components/auth/auth-context";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ChakraProvider value={defaultSystem}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {props.children}
        </ThemeProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}
