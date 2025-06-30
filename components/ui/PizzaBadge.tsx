"use client";

import { Badge as ChakraBadge, BadgeProps } from "@chakra-ui/react";

interface PizzaBadgeProps extends Omit<BadgeProps, "colorScheme" | "variant"> {
  variant?:
    | "preparing"
    | "delivered"
    | "cancelled"
    | "success"
    | "warning"
    | "info"
    | "default";
}

/**
 * Componente Badge customizado com cores semânticas do Pizza Express
 */
export function PizzaBadge({
  variant = "default",
  children,
  ...props
}: PizzaBadgeProps) {
  const getBadgeStyles = () => {
    const baseStyles = {
      px: 3,
      py: 1,
      borderRadius: "full",
      fontSize: "sm",
      fontWeight: "600",
      border: "1px solid",
    };

    switch (variant) {
      case "preparing":
        return {
          ...baseStyles,
          bg: "yellow.100",
          color: "yellow.800",
          borderColor: "yellow.300",
        };
      case "delivered":
      case "success":
        return {
          ...baseStyles,
          bg: "green.100",
          color: "green.800",
          borderColor: "green.300",
        };
      case "cancelled":
        return {
          ...baseStyles,
          bg: "red.100",
          color: "red.800",
          borderColor: "red.300",
        };
      case "warning":
        return {
          ...baseStyles,
          bg: "yellow.100",
          color: "yellow.800",
          borderColor: "yellow.300",
        };
      case "info":
        return {
          ...baseStyles,
          bg: "blue.100",
          color: "blue.800",
          borderColor: "blue.300",
        };
      default:
        return {
          ...baseStyles,
          bg: "gray.100",
          color: "gray.800",
          borderColor: "gray.300",
        };
    }
  };

  return (
    <ChakraBadge {...getBadgeStyles()} {...props}>
      {children}
    </ChakraBadge>
  );
}
