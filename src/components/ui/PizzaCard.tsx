"use client";

import { Box, BoxProps } from "@chakra-ui/react";

interface PizzaCardProps extends Omit<BoxProps, "variant"> {
  variant?: "default" | "pizza" | "success" | "warning" | "danger" | "accent";
}

/**
 * Componente Card customizado com paleta de cores do Pizza Express
 */
export function PizzaCard({
  variant = "default",
  children,
  ...props
}: PizzaCardProps) {
  const getCardStyles = () => {
    const baseStyles = {
      bg: "white",
      borderRadius: "lg",
      boxShadow: "md",
      border: "1px solid",
      transition: "all 0.3s ease",
      overflow: "hidden",
      p: 8, // Padding interno consistente
      _hover: {
        boxShadow: "lg",
        transform: "translateY(-2px)",
      },
    };

    switch (variant) {
      case "pizza":
        return {
          ...baseStyles,
          borderColor: "orange.600",
          _hover: {
            ...baseStyles._hover,
            borderColor: "orange.500",
          },
        };
      case "success":
        return {
          ...baseStyles,
          borderColor: "green.600",
          bg: "#F0FDF4",
          _hover: {
            ...baseStyles._hover,
            borderColor: "green.500",
          },
        };
      case "warning":
        return {
          ...baseStyles,
          borderColor: "yellow.500",
          bg: "yellow.50",
          _hover: {
            ...baseStyles._hover,
            borderColor: "yellow.400",
          },
        };
      case "danger":
        return {
          ...baseStyles,
          borderColor: "red.600",
          bg: "#FEF2F2",
          _hover: {
            ...baseStyles._hover,
            borderColor: "red.500",
          },
        };
      case "accent":
        return {
          ...baseStyles,
          borderColor: "blue.700",
          _hover: {
            ...baseStyles._hover,
            borderColor: "blue.600",
          },
        };
      default:
        return {
          ...baseStyles,
          borderColor: "gray.200",
        };
    }
  };

  return (
    <Box {...getCardStyles()} {...props}>
      {children}
    </Box>
  );
}
