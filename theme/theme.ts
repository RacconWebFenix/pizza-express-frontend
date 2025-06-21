import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Configuração personalizada do tema
const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          red: { value: "#D92B2B" }, // Tomate, Pepperoni
          green: { value: "#228B22" }, // Manjericão, Pesto
          yellow: { value: "#FFC72C" }, // Queijo
          beige: { value: "#F5DEB3" }, // Massa, Crosta
          brown: { value: "#A0522D" }, // Forno a lenha, Crosta mais escura
          charcoal: { value: "#36454F" }, // Lousa, Acentos escuros
          cream: { value: "#FFFDD0" }, // Mozzarella, Fundo claro
        },
      },
    },
  },
});

// Exporta o sistema criado com a configuração padrão e a configuração personalizada
export const system = createSystem(defaultConfig, customConfig);
