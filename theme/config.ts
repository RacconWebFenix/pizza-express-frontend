// theme/config.ts

import { defineTokens } from "@pandacss/dev";

// Aqui definimos apenas os nossos tokens customizados
const tokens = defineTokens({
  colors: {
    brand: {
      primary: { value: "{colors.blue.800}" },
      accent: { value: "{colors.blue.700}" },
      pizza: { value: "{colors.orange.600}" },
      medium: { value: "{colors.gray.800}" },
      light: { value: "{colors.gray.100}" },
      dark: { value: "{colors.gray.800}" },
      fresh: { value: "{colors.green.600}" },
      success: { value: "{colors.green.600}" },
      cream: { value: "{colors.gray.100}" },
      warning: { value: "{colors.yellow.500}" },
      error: { value: "{colors.red.600}" },
    },
  },
  zIndex: {
    sticky: { value: 10 },
    popover: { value: 20 },
    modal: { value: 1400 },
    modalOnTop: { value: 1401 },
  },
});

// Este objeto será a nossa única fonte da verdade
export const themeExtension = {
  tokens,
  // Adicione aqui outras extensões, como semanticTokens ou textStyles, se precisar
};
