import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import {
  buttonRecipe,
  cardRecipe,
  badgeRecipe,
  textRecipe,
  containerRecipe,
} from "../recipes";

/**
 * Sistema customizado do Chakra UI para Pizza Express
 * Inclui todas as recipes e configurações específicas do projeto
 */
const customConfig = defineConfig({
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
    recipes: {
      button: buttonRecipe,
      card: cardRecipe,
      badge: badgeRecipe,
      text: textRecipe,
      container: containerRecipe,
    },
    tokens: {
      ...defaultConfig.theme?.tokens,
      colors: {
        ...defaultConfig.theme?.tokens?.colors,
        // Mantém compatibilidade com cores brand existentes
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
    },
  },
});

export const pizzaExpressSystem = createSystem(customConfig);
