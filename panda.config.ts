// panda.config.ts

import { defineConfig } from "@pandacss/dev";
import { themeExtension } from "./theme/config"; // 1. Importe nossa fonte da verdade

export default defineConfig({
  preflight: true,
  include: ["./{app,components}/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  jsxFramework: "react",
  presets: ["@chakra-ui/panda-preset"],

  // 2. Use a extensão importada
  theme: {
    extend: themeExtension,
  },
});
