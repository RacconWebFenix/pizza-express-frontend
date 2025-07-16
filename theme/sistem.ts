// theme/system.ts

import { createSystem, defaultConfig } from "@chakra-ui/react";
import { themeExtension } from "./config"; // 1. Importe a mesma fonte da verdade

/**
 * Cria o sistema de design do Chakra UI.
 *
 * Ele mescla a configuração padrão do Chakra (`defaultConfig`)
 * com as nossas customizações (`themeExtension`), criando um tema completo
 * sem duplicar código.
 */
export const pizzaExpressSystem = createSystem({
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
    ...themeExtension, // 2. Aplique nossa extensão ao tema
  },
});