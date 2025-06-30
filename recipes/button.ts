import { defineRecipe } from "@chakra-ui/react";

/**
 * Recipe para botões com paleta de cores do Pizza Express
 * Baseado no sistema de cores existente do projeto
 */
export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    borderRadius: "lg",
    transition: "all 0.2s ease",
    cursor: "pointer",
    _disabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "blue.800",
        color: "white",
        _hover: {
          bg: "blue.700",
          transform: "translateY(-1px)",
        },
        _active: {
          bg: "blue.900",
          transform: "translateY(0)",
        },
      },
      secondary: {
        bg: "blue.700",
        color: "white",
        _hover: {
          bg: "blue.600",
          transform: "translateY(-1px)",
        },
        _active: {
          bg: "blue.800",
          transform: "translateY(0)",
        },
      },
      pizza: {
        bg: "orange.600",
        color: "white",
        _hover: {
          bg: "orange.500",
          transform: "translateY(-1px)",
        },
        _active: {
          bg: "orange.700",
          transform: "translateY(0)",
        },
      },
      success: {
        bg: "green.600",
        color: "white",
        _hover: {
          bg: "green.500",
          transform: "translateY(-1px)",
        },
        _active: {
          bg: "green.700",
          transform: "translateY(0)",
        },
      },
      warning: {
        bg: "yellow.500",
        color: "white",
        _hover: {
          bg: "yellow.400",
          transform: "translateY(-1px)",
        },
        _active: {
          bg: "yellow.600",
          transform: "translateY(0)",
        },
      },
      danger: {
        bg: "red.600",
        color: "white",
        _hover: {
          bg: "red.500",
          transform: "translateY(-1px)",
        },
        _active: {
          bg: "red.700",
          transform: "translateY(0)",
        },
      },
      outline: {
        bg: "white",
        borderWidth: "2px",
        borderColor: "blue.800",
        color: "blue.800",
        _hover: {
          bg: "blue.50",
          borderColor: "blue.700",
          transform: "translateY(-1px)",
        },
        _active: {
          bg: "blue.100",
          transform: "translateY(0)",
        },
      },
      ghost: {
        bg: "transparent",
        color: "gray.800",
        _hover: {
          bg: "gray.100",
          transform: "translateY(-1px)",
        },
        _active: {
          bg: "gray.200",
          transform: "translateY(0)",
        },
      },
    },
    size: {
      sm: {
        px: 3,
        py: 2,
        fontSize: "sm",
        h: 8,
      },
      md: {
        px: 4,
        py: 3,
        fontSize: "md",
        h: 10,
      },
      lg: {
        px: 6,
        py: 4,
        fontSize: "lg",
        h: 12,
      },
      xl: {
        px: 8,
        py: 6,
        fontSize: "xl",
        h: 16,
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
