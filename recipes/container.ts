import { defineRecipe } from "@chakra-ui/react";

/**
 * Recipe para containers com diferentes layouts
 */
export const containerRecipe = defineRecipe({
  base: {
    w: "full",
    mx: "auto",
    px: 4,
  },
  variants: {
    variant: {
      page: {
        minH: "100vh",
        bg: "yellow.200",
        p: 8,
      },
      content: {
        maxW: "1200px",
        mx: "auto",
      },
      section: {
        py: 8,
      },
      card: {
        bg: "white",
        borderRadius: "xl",
        boxShadow: "md",
        p: 6,
      },
    },
    maxWidth: {
      sm: {
        maxW: "sm",
      },
      md: {
        maxW: "md",
      },
      lg: {
        maxW: "lg",
      },
      xl: {
        maxW: "xl",
      },
      "2xl": {
        maxW: "2xl",
      },
      "4xl": {
        maxW: "4xl",
      },
      full: {
        maxW: "full",
      },
      container: {
        maxW: "1200px",
      },
    },
  },
  defaultVariants: {
    variant: "content",
    maxWidth: "container",
  },
});
