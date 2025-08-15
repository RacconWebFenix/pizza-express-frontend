import { defineConfig } from '@pandacss/dev';
import chakraPreset from '@chakra-ui/panda-preset';
import { theme } from './src/theme'; // Importamos nosso objeto de tema

export default defineConfig({
  preflight: true,
  // Usamos o preset do Chakra para ter a base de componentes
  presets: [chakraPreset],
  
  // Incluímos todos os arquivos que usarão os estilos
  include: ['./src/**/*.{js,jsx,ts,tsx}', './src/app/**/*.{js,jsx,ts,tsx}'],
  exclude: [],

  // Esta é a parte mais importante: estendemos o tema base com nossas customizações
  theme: {
    extend: {
      // Nossos tokens (cores base)
      tokens: theme.tokens,
      // Nossos tokens semânticos (nomes de uso)
      semanticTokens: theme.semanticTokens,
      // Nossas receitas (estilos de componentes)
      recipes: theme.recipes,
    },
  },

  outdir: 'styled-system',
});