import { defineRecipe } from "@chakra-ui/react";

/**
 * Recipe para cards com estilos consistentes do Pizza Express
 */
export const cardRecipe = defineRecipe({
  base: {
    bg: "white",
    borderRadius: "xl",
    boxShadow: "md",
    border: "2px solid",
    transition: "all 0.3s ease",
    overflow: "hidden",
  },
  variants: {
    variant: {
      default: {
        borderColor: "gray.200",
        _hover: {
          boxShadow: "lg",
          transform: "translateY(-2px)",
        },
      },
      pizza: {
        borderColor: "orange.600",
        _hover: {
          boxShadow: "lg",
          transform: "translateY(-2px)",
          borderColor: "orange.500",
        },
      },
      success: {
        borderColor: "green.600",
        bg: "#F0FDF4",
        _hover: {
          boxShadow: "lg",
          transform: "translateY(-2px)",
          borderColor: "green.500",
        },
      },
      warning: {
        borderColor: "yellow.500",
        bg: "yellow.50",
        _hover: {
          boxShadow: "lg",
          transform: "translateY(-2px)",
          borderColor: "yellow.400",
        },
      },
      danger: {
        borderColor: "red.600",
        bg: "#FEF2F2",
        _hover: {
          boxShadow: "lg",
          transform: "translateY(-2px)",
          borderColor: "red.500",
        },
      },
      accent: {
        borderColor: "blue.700",
        _hover: {
          boxShadow: "lg",
          transform: "translateY(-2px)",
          borderColor: "blue.600",
        },
      },
    },
    size: {
      sm: {
        p: 4,
      },
      md: {
        p: 6,
      },
      lg: {
        p: 8,
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});
