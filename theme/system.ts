import { pizzaTheme } from "@/theme/theme";
import { createSystem, defaultConfig, SystemConfig } from "@chakra-ui/react";

// Aqui fazemos a fusão dos temas da forma correta e segura
const finalConfig = {
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
    tokens: {
      ...(defaultConfig.theme?.tokens ?? {}),
      ...pizzaTheme.tokens,
    },
    recipes: {
      ...(defaultConfig.theme?.recipes ?? {}),
      ...pizzaTheme.recipes,
    },
  },
} as SystemConfig; // 2. Afirmamos para o TypeScript que este objeto é do tipo correto

// Cria e exporta o sistema de design pronto para ser usado
export const pizzaExpressSystem = createSystem(finalConfig);
