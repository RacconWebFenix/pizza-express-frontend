import { pizzaTheme } from "@/theme/theme";
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: pizzaTheme.tokens,
    // Remove recipes from the theme to avoid type incompatibility
    // recipes: pizzaTheme.recipes,
  },
});

// Attach recipes separately if needed, or handle them in a compatible way
export const pizzaExpressSystem = createSystem(defaultConfig, config);
