import {
  defineSemanticTokens,
  defineRecipe,
  defineSlotRecipe,
} from "@pandacss/dev";

const colors = {
  brand: {
    primary: { value: "#ED8936" },
    secondary: { value: "#F6AD55" },
  },
  gray: {
    800: { value: "#1A202C" },
    700: { value: "#2D3748" },
    600: { value: "#4A5568" },
    200: { value: "#E2E8F0" },
    100: { value: "#F7FAFC" },
    50: { value: "#A0AEC0" },
  },
};

const semanticTokens = defineSemanticTokens({
  colors: {
    background: {
      primary: { value: "{colors.gray.800}" },
      secondary: { value: "{colors.gray.700}" },
      tertiary: { value: "{colors.gray.600}" },
    },
    text: {
      primary: { value: "{colors.gray.100}" },
      secondary: { value: "{colors.gray.50}" },
    },
    brand: {
      primary: { value: "{colors.brand.primary}" },
      secondary: { value: "{colors.brand.secondary}" },
    },
  },
});

const buttonRecipe = defineRecipe({
  className: "button",
  description: "Styles for the Button component",
  base: {
    fontWeight: "bold",
    borderRadius: "md",
  },
  // --- CORREÇÃO APLICADA AQUI ---
  variants: {
    variant: {
      // Agrupando por tipo de variante ('variant')
      solid: {
        bg: "brand.primary",
        color: "white",
        _hover: {
          bg: "brand.secondary",
        },
      },
    },
  },
});

const inputRecipe = defineSlotRecipe({
  className: "input",
  description: "Styles for the Input component",
  slots: ["field"],
  base: {
    field: {
      bg: "background.secondary",
      borderColor: "background.tertiary",
      _focusVisible: {
        borderColor: "brand.primary!",
        boxShadow: "0 0 0 1px {colors.brand.primary}!",
      },
    },
  },
});

const components = {
  Button: buttonRecipe,
  Input: inputRecipe,
};

export const theme = {
  tokens: {
    colors,
  },
  semanticTokens,
  recipes: components,
};
