import { defineRecipe } from "@chakra-ui/react";

/**
 * Recipe para badges com variações de status
 */
export const badgeRecipe = defineRecipe({
  base: {
    px: 3,
    py: 1,
    borderRadius: "full",
    fontSize: "sm",
    fontWeight: "600",
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
  },
  variants: {
    variant: {
      preparing: {
        bg: "yellow.100",
        color: "yellow.800",
        border: "1px solid",
        borderColor: "yellow.300",
      },
      delivered: {
        bg: "green.100",
        color: "green.800",
        border: "1px solid",
        borderColor: "green.300",
      },
      cancelled: {
        bg: "red.100",
        color: "red.800",
        border: "1px solid",
        borderColor: "red.300",
      },
      success: {
        bg: "green.100",
        color: "green.800",
        border: "1px solid",
        borderColor: "green.300",
      },
      warning: {
        bg: "yellow.100",
        color: "yellow.800",
        border: "1px solid",
        borderColor: "yellow.300",
      },
      info: {
        bg: "blue.100",
        color: "blue.800",
        border: "1px solid",
        borderColor: "blue.300",
      },
      default: {
        bg: "gray.100",
        color: "gray.800",
        border: "1px solid",
        borderColor: "gray.300",
      },
    },
    size: {
      sm: {
        px: 2,
        py: 0.5,
        fontSize: "xs",
      },
      md: {
        px: 3,
        py: 1,
        fontSize: "sm",
      },
      lg: {
        px: 4,
        py: 1.5,
        fontSize: "md",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});
