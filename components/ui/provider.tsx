"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { pizzaSystem } from "./pizzaTheme";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={pizzaSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
