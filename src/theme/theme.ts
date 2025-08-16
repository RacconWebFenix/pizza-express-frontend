// src/theme/theme.ts

export const pizzaTheme = {
  tokens: {
    colors: {
      brand: {
        primary: { value: "#D92B2B" }, // Vermelho principal
        secondary: { value: "#2E7D32" }, // Verde
        accent: { value: "#FFC107" }, // Amarelo/Mostarda
      },
      white: { value: "#FFFFFF" },
      background: { value: "#F5F5F5" },
      surface: { value: "#FFFFFF" },
      textPrimary: { value: "#212121" },
      textSecondary: { value: "#757575" },
      success: { value: "#2E7D32" },
      warning: { value: "#ECC94B" },
      error: { value: "#D92B2B" },
    },
    fonts: {
      heading: { value: "'Roboto Slab', serif" },
      body: { value: "'Roboto', sans-serif" },
    },
    zIndex: {
      sticky: { value: 10 },
      popover: { value: 20 },
      modal: { value: 1400 },
      modalOnTop: { value: 1401 },
    },
  },
  recipes: {
    button: {
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
        fontFamily: "body",
        _disabled: { opacity: 0.6, cursor: "not-allowed" },
      },
      variants: {
        variant: {
          // ALTERADO: Renomeamos 'primary' para 'solid' para sobrescrever a variante padrão do Chakra
          solid: {
            bg: "brand.primary",
            color: "white",
            _hover: {
              bg: "#C62828", // Vermelho mais escuro para o hover
            },
          },
          accent: {
            bg: "brand.accent",
            color: "textPrimary",
            _hover: {
              bg: "#FFB300",
            },
          },
          ghost: {
            bg: "transparent",
            color: "gray.600",
            _hover: { bg: "rgba(217, 43, 43, 0.1)" },
          },
        },
        size: {
          md: { px: 4, h: 10, fontSize: "md" },
          lg: { px: 6, h: 12, fontSize: "lg" },
          sm: { px: 2, h: 8, fontSize: "sm" },
        },
      },
    },
  },
};
