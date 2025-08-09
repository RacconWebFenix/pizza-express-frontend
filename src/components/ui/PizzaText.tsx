"use client";

import { Text as ChakraText, TextProps } from "@chakra-ui/react";

interface PizzaTextProps extends Omit<TextProps, "variant"> {
  variant?:
    | "heading"
    | "subheading"
    | "body"
    | "caption"
    | "muted"
    | "accent"
    | "pizza"
    | "success"
    | "warning"
    | "danger";
}

/**
 * Componente Text customizado com variações semânticas
 */
export function PizzaText({
  variant = "body",
  children,
  ...props
}: PizzaTextProps) {
  const getTextStyles = () => {
    const baseStyles = {
      lineHeight: "1.5",
    };

    switch (variant) {
      case "heading":
        return {
          ...baseStyles,
          fontWeight: "bold",
          color: "gray.800",
        };
      case "subheading":
        return {
          ...baseStyles,
          fontWeight: "600",
          color: "gray.700",
        };
      case "body":
        return {
          ...baseStyles,
          fontWeight: "400",
          color: "gray.800",
        };
      case "caption":
        return {
          ...baseStyles,
          fontWeight: "400",
          color: "gray.600",
          fontSize: "sm",
        };
      case "muted":
        return {
          ...baseStyles,
          fontWeight: "400",
          color: "gray.500",
          fontSize: "sm",
        };
      case "accent":
        return {
          ...baseStyles,
          fontWeight: "600",
          color: "blue.700",
        };
      case "pizza":
        return {
          ...baseStyles,
          fontWeight: "600",
          color: "orange.600",
        };
      case "success":
        return {
          ...baseStyles,
          fontWeight: "600",
          color: "green.600",
        };
      case "warning":
        return {
          ...baseStyles,
          fontWeight: "600",
          color: "yellow.600",
        };
      case "danger":
        return {
          ...baseStyles,
          fontWeight: "600",
          color: "red.600",
        };
      default:
        return baseStyles;
    }
  };

  return (
    <ChakraText {...getTextStyles()} {...props}>
      {children}
    </ChakraText>
  );
}
