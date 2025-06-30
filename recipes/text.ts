import { defineRecipe } from "@chakra-ui/react";

/**
 * Recipe para textos com variações semânticas
 */
export const textRecipe = defineRecipe({
  base: {
    lineHeight: "1.5",
  },
  variants: {
    variant: {
      heading: {
        fontWeight: "bold",
        color: "gray.800",
      },
      subheading: {
        fontWeight: "600",
        color: "gray.700",
      },
      body: {
        fontWeight: "400",
        color: "gray.800",
      },
      caption: {
        fontWeight: "400",
        color: "gray.600",
        fontSize: "sm",
      },
      muted: {
        fontWeight: "400",
        color: "gray.500",
        fontSize: "sm",
      },
      accent: {
        fontWeight: "600",
        color: "blue.700",
      },
      pizza: {
        fontWeight: "600",
        color: "orange.600",
      },
      success: {
        fontWeight: "600",
        color: "green.600",
      },
      warning: {
        fontWeight: "600",
        color: "yellow.600",
      },
      danger: {
        fontWeight: "600",
        color: "red.600",
      },
    },
    size: {
      xs: {
        fontSize: "xs",
      },
      sm: {
        fontSize: "sm",
      },
      md: {
        fontSize: "md",
      },
      lg: {
        fontSize: "lg",
      },
      xl: {
        fontSize: "xl",
      },
      "2xl": {
        fontSize: "2xl",
      },
      "3xl": {
        fontSize: "3xl",
      },
      "4xl": {
        fontSize: "4xl",
      },
    },
  },
  defaultVariants: {
    variant: "body",
    size: "md",
  },
});
