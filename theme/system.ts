import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import {
  buttonRecipe,
  cardRecipe,
  badgeRecipe,
  textRecipe,
  containerRecipe,
} from "../recipes";

/**
 * Sistema customizado do Chakra UI (Panda CSS) para Pizza Express
 * Inclui todas as recipes e configurações de design tokens do projeto.
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
    // =========================================================================
    // === A SEÇÃO DE TOKENS É O ÚNICO LUGAR QUE PRECISAMOS MODIFICAR ========
    // =========================================================================
    tokens: {
      ...defaultConfig.theme?.tokens,
      colors: {
        ...defaultConfig.theme?.tokens?.colors,
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
      // --- A FORMA CORRETA DE ADICIONAR Z-INDEX ---
      // Panda CSS reconhece a chave "zIndex" e automaticamente
      // cria a propriedade utilitária "zIndex" para os componentes.
      zIndex: {
        ...defaultConfig.theme?.tokens?.zIndex,
        sticky: { value: 10 },
        popover: { value: 20 },
        modal: { value: 1400 },
        modalOnTop: { value: 1401 },
      },
    },
  },
});

export const pizzaExpressSystem = createSystem(customConfig);