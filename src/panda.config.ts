import { defineConfig } from "@pandacss/dev";
import { pizzaTheme } from "./theme/theme"; // Importa nossa fonte da verdade

export default defineConfig({
  // Limpa os estilos padrão do navegador
  preflight: true,

  // Onde o PandaCSS deve procurar por seu código para analisar o uso de estilos
  include: ["./{app,components}/**/*.{js,jsx,ts,tsx}"],

  // O diretório de saída para os tipos e CSS gerados
  outdir: "styled-system",

  // Importar o preset de configurações do Chakra UI
  presets: ["@chakra-ui/panda-preset"],

  // Usa o tema importado para estender o preset do Chakra
  theme: {
    extend: pizzaTheme,
  },
});
