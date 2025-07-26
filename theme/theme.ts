import { defineRecipe } from "@pandacss/dev";

// =================================================================
// 1. DEFINIÇÃO DOS TOKENS (Cores, Fontes, z-index, etc.)
// =================================================================
export const pizzaTheme = {
  tokens: {
    colors: {
      brand: {
        // Cores revisadas para a identidade da pizzaria
        primary: { value: "#D92B2B" }, // Vermelho principal (tomate, paixão)
        secondary: { value: "#2E7D32" }, // Verde (ingredientes frescos, manjericão)
        accent: { value: "#FFC107" }, // Amarelo/Mostarda (queijo, alegria)

        // Mantendo tons neutros para UI
        background: { value: "#F5F5F5" }, // Fundo principal da aplicação
        surface: { value: "#FFFFFF" }, // Fundo para cards e elementos elevados
        textPrimary: { value: "#212121" }, // Texto principal, escuro
        textSecondary: { value: "#757575" }, // Texto de apoio, mais claro

        // Cores de feedback
        success: { value: "#2E7D32" }, // Verde para sucesso
        warning: { value: "#ECC94B" }, // Amarelo para alertas
        error: { value: "#D92B2B" }, // Vermelho para erros
      },
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
        fontFamily: "body", // Usando a fonte do corpo para consistência
        _disabled: { opacity: 0.6, cursor: "not-allowed" },
      },
      variants: {
        variant: {
          primary: {
            bg: "brand.primary",
            color: "white",
            _hover: {
              bg: "#C62828", // Um tom de vermelho um pouco mais escuro para o hover
            },
          },
          // Renomeei 'pizza' para 'accent' para um nome mais semântico
          accent: {
            bg: "brand.accent",
            color: "brand.textPrimary",
            _hover: {
              bg: "#FFB300", // Um tom de amarelo um pouco mais escuro
            },
          },
          ghost: {
            bg: "transparent",
            color: "gray.600",
            _hover: { bg: "rgba(217, 43, 43, 0.1)" }, // Fundo vermelho bem sutil no hover
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
