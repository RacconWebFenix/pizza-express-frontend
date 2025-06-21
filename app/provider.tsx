"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { system } from "../theme/theme";
import { AuthProvider } from "../components/auth/auth-context";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ChakraProvider value={system}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {props.children}
        </ThemeProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}
