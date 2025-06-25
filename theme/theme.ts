import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Configuração personalizada do tema
const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          // Cores principais - Profissionais e elegantes
          primary: { value: "#1A365D" }, // Azul navy profissional
          secondary: { value: "#2D3748" }, // Cinza escuro sofisticado
          accent: { value: "#3182CE" }, // Azul confiança

          // Cores específicas da pizzaria (uso restrito)
          pizza: { value: "#D69E2E" }, // Dourado para elementos da pizzaria
          fresh: { value: "#38A169" }, // Verde para ingredientes frescos

          // Tons neutros profissionais
          dark: { value: "#1A202C" }, // Quase preto elegante
          medium: { value: "#4A5568" }, // Cinza médio
          light: { value: "#F7FAFC" }, // Branco quente
          cream: { value: "#FFFBF0" }, // Creme sutil

          // Estados e feedback
          success: { value: "#38A169" },
          warning: { value: "#D69E2E" },
          error: { value: "#E53E3E" },
          info: { value: "#3182CE" },
        },
      },
    },
  },
});

// Exporta o sistema criado com a configuração padrão e a configuração personalizada
export const system = createSystem(defaultConfig, customConfig);
