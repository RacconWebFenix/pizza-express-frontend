import { pizzaTheme } from "@/theme/theme";
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: pizzaTheme.tokens,
  },
});
export const pizzaExpressSystem = createSystem(defaultConfig, config);
