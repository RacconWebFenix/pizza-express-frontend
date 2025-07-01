"use client";

import { Button as ChakraButton, ButtonProps, HStack } from "@chakra-ui/react";
import { PizzaSpinner } from "./PizzaSpinner";

interface PizzaButtonProps
  extends Omit<ButtonProps, "colorScheme" | "variant"> {
  variant?:
    | "primary"
    | "secondary"
    | "pizza"
    | "success"
    | "warning"
    | "danger"
    | "outline"
    | "ghost";
  loading?: boolean;
}

/**
 * Componente Button customizado com paleta de cores do Pizza Express
 * Baseado no sistema de cores do projeto para manter consistência
 */
export function PizzaButton({
  variant = "primary",
  loading = false,
  children,
  ...props
}: PizzaButtonProps) {
  // Mapeia variantes customizadas para props do Chakra
  const getButtonStyles = () => {
    switch (variant) {
      case "primary":
        return {
          bg: "blue.800",
          color: "white",
          _hover: { bg: "blue.700", transform: "translateY(-1px)" },
          _active: { bg: "blue.900", transform: "translateY(0)" },
        };
      case "secondary":
        return {
          bg: "blue.700",
          color: "white",
          _hover: { bg: "blue.600", transform: "translateY(-1px)" },
          _active: { bg: "blue.800", transform: "translateY(0)" },
        };
      case "pizza":
        return {
          bg: "orange.600",
          color: "white",
          _hover: { bg: "orange.500", transform: "translateY(-1px)" },
          _active: { bg: "orange.700", transform: "translateY(0)" },
        };
      case "success":
        return {
          bg: "green.600",
          color: "white",
          _hover: { bg: "green.500", transform: "translateY(-1px)" },
          _active: { bg: "green.700", transform: "translateY(0)" },
        };
      case "warning":
        return {
          bg: "yellow.500",
          color: "white",
          _hover: { bg: "yellow.400", transform: "translateY(-1px)" },
          _active: { bg: "yellow.600", transform: "translateY(0)" },
        };
      case "danger":
        return {
          bg: "red.600",
          color: "white",
          _hover: { bg: "red.500", transform: "translateY(-1px)" },
          _active: { bg: "red.700", transform: "translateY(0)" },
        };
      case "outline":
        return {
          variant: "outline" as const,
          borderColor: "blue.800",
          color: "blue.800",
          _hover: {
            bg: "blue.50",
            borderColor: "blue.700",
            transform: "translateY(-1px)",
          },
          _active: { bg: "blue.100", transform: "translateY(0)" },
        };
      case "ghost":
        return {
          variant: "ghost" as const,
          color: "gray.800",
          _hover: { bg: "gray.100", transform: "translateY(-1px)" },
          _active: { bg: "gray.200", transform: "translateY(0)" },
        };
      default:
        return {
          bg: "blue.800",
          color: "white",
          _hover: { bg: "blue.700", transform: "translateY(-1px)" },
          _active: { bg: "blue.900", transform: "translateY(0)" },
        };
    }
  };

  const buttonStyles = getButtonStyles();

  return (
    <ChakraButton
      fontWeight="600"
      borderRadius="md"
      transition="all 0.2s ease"
      minH="44px" // Altura consistente com inputs
      px={6} // Padding horizontal padrão
      fontSize="md" // Tamanho de fonte consistente
      disabled={loading || props.disabled}
      {...buttonStyles}
      {...props}
    >
      {loading ? (
        <HStack gap={2}>
          <PizzaSpinner size={16} />
          <span>{children || "Carregando..."}</span>
        </HStack>
      ) : (
        children
      )}
    </ChakraButton>
  );
}
