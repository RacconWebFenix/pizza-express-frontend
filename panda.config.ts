import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Ativa o reset de estilos (preflight) — opcional
  preflight: true,

  // Ajuste os caminhos conforme sua estrutura de código
  include: ["src/**/*.{ts,tsx,js,jsx}"],
  exclude: [],

  // Pasta de saída dos estilos gerados
  outdir: "styled-system",
  
  theme: {
    
    extend: {
      tokens: {
        colors: {
          transparent: { value: "transparent" },
          // Outros tokens padrão ou personalizados
        },
      },
      semanticTokens: {
        colors: {
          "chakra-subtle-text": {
            _light: { value: "{colors.gray.600}" },
            _dark: { value: "{colors.gray.400}" },
          },
          "chakra-placeholder-color": {
            _light: { value: "{colors.gray.500}" },
            _dark: { value: "{colors.gray.300}" },
          },
        },
      },
      // Exemplo de recipe renomeada para evitar conflito com padrão 'container'
      recipes: {
        appContainer: {
          className: "app-container",
          base: {
            width: "100%",
            maxWidth: "7xl",
            mx: "auto",
            px: { base: "4", md: "6" },
          },
          // Variantes, defaultVariants, compoundVariants etc. podem ser adicionados aqui, conforme necessidade
        },
      },
    },
  },

  // Se você quiser estender padrões já existentes (patterns)
  patterns: {
    extend: {
      // Aqui você não precisa redesenhar "container", já que isola o recipe
      // Você pode estender outros padrões conforme necessário.
    },
  },
});
