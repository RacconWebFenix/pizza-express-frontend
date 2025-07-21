import { defineTokens, defineRecipe } from "@pandacss/dev";

// =================================================================
// 1. DEFINIÇÃO DOS TOKENS (cores, espaçamentos, z-index, etc.)
// =================================================================
export const pizzaTheme = {
  tokens: {
    colors: {
      brand: {
        primary: { value: "#2B6CB0" },
        accent: { value: "#2C5282" },
        pizza: { value: "#ED8936" },
        medium: { value: "#2D3748" },
        light: { value: "#F7FAFC" },
        dark: { value: "#1A202C" },
        fresh: { value: "#38A169" },
        success: { value: "#38A169" },
        cream: { value: "#F7FAFC" },
        warning: { value: "#ECC94B" },
        error: { value: "#E53E3E" },
      },
    },
    zIndex: {
      sticky: { value: 10 },
      popover: { value: 20 },
      modal: { value: 1400 },
      modalOnTop: { value: 1401 },
    },
  },
  recipes: {
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
          ghost: {
            bg: "transparent",
            color: "brand.primary",
            _hover: { bg: "brand.light" },
          },
        },
        size: {
          md: { px: 4, h: 10, fontSize: "md" },
          lg: { px: 6, h: 12, fontSize: "lg" },
          sm: { px: 2, h: 8, fontSize: "sm" },
        },
      },
      defaultVariants: { variant: "primary", size: "md" },
    }),
    // Adicione aqui as recipes para Card, Badge, etc. quando precisar
  },
};
