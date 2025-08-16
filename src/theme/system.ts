import { pizzaTheme } from "@/theme/theme";
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    // Precisamos incluir os tokens E as recipes do seu tema
    tokens: pizzaTheme.tokens,
    recipes: pizzaTheme.recipes,
  },
});

export const pizzaExpressSystem = createSystem(defaultConfig, config);
