import { defineTokens, defineRecipe } from "@pandacss/dev";

// =================================================================
// 1. DEFINIÇÃO DOS TOKENS (cores, espaçamentos, z-index, etc.)
// =================================================================
const tokens = defineTokens({
  colors: {
    brand: {
      primary: { value: "{colors.blue.800}" },
      accent: { value: "{colors.blue.700}" },
      pizza: { value: "{colors.orange.600}" },
      medium: { value: "{colors.gray.800}" },
      light: { value: "{colors.gray.100}" },
      dark: { value: "{colors.gray.800}" },
      fresh: { value: "{colors.green.600}" },
      success: { value: "{colors.green.600}" },
      cream: { value: "{colors.gray.100}" },
      warning: { value: "{colors.yellow.500}" },
      error: { value: "{colors.red.600}" },
    },
  },
  zIndex: {
    sticky: { value: 10 },
    popover: { value: 20 },
    modal: { value: 1400 },
    modalOnTop: { value: 1401 },
  },
});

// =================================================================
// 2. DEFINIÇÃO DAS "RECIPES" (variantes de componentes)
// =================================================================
const recipes = {
  button: defineRecipe({
    className: "button",
    description: "The styles for the Button component",
    base: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      borderRadius: "lg",
      transition: "all 0.2s ease",
      cursor: "pointer",
      _disabled: { opacity: 0.6, cursor: "not-allowed" },
    },
    variants: {
      variant: {
        primary: {
          bg: "brand.primary",
          color: "white",
          _hover: { bg: "brand.accent" },
        },
        pizza: {
          bg: "brand.pizza",
          color: "white",
          _hover: { bg: "orange.500" },
        },
      },
      size: {
        md: { px: 4, h: 10, fontSize: "md" },
        lg: { px: 6, h: 12, fontSize: "lg" },
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }),
  // Adicione aqui as recipes para Card, Badge, etc. quando precisar
};

// =================================================================
// 3. EXPORTAÇÃO DO TEMA COMPLETO
// =================================================================
export const pizzaTheme = {
  tokens,
  recipes,
};
