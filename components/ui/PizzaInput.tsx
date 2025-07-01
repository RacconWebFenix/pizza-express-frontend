"use client";

import { Input, InputProps, Box } from "@chakra-ui/react";
import { forwardRef } from "react";
import { PizzaText } from "./PizzaText";

interface PizzaInputProps extends Omit<InputProps, "size"> {
  label?: string;
  error?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
}

export const PizzaInput = forwardRef<HTMLInputElement, PizzaInputProps>(
  ({ label, error, required, size = "md", ...props }, ref) => {
    const sizeStyles = {
      sm: {
        fontSize: "sm",
        px: 3,
        py: 2,
        h: "36px",
      },
      md: {
        fontSize: "md",
        px: 4,
        py: 3,
        h: "44px",
      },
      lg: {
        fontSize: "lg",
        px: 5,
        py: 4,
        h: "52px",
      },
    };

    const currentSize = sizeStyles[size];

    return (
      <Box w="full">
        {label && (
          <PizzaText color="gray.800" mb={2} fontSize="sm" fontWeight="medium">
            {label}
            {required && (
              <PizzaText as="span" color="red.500" ml={1}>
                *
              </PizzaText>
            )}
          </PizzaText>
        )}

        <Input
          ref={ref}
          bg="white"
          color="gray.800"
          border="2px solid"
          borderColor={error ? "red.300" : "gray.300"}
          borderRadius="md"
          _placeholder={{
            color: "gray.500",
            fontSize: currentSize.fontSize,
          }}
          _hover={{
            borderColor: error ? "red.400" : "brand.secondary",
          }}
          _focus={{
            borderColor: error ? "red.500" : "brand.primary",
            boxShadow: `0 0 0 1px ${error ? "red.500" : "brand.primary"}`,
            bg: "white",
          }}
          _disabled={{
            opacity: 0.6,
            cursor: "not-allowed",
            bg: "gray.50",
          }}
          transition="all 0.2s ease-in-out"
          {...currentSize}
          {...props}
        />

        {error && (
          <PizzaText color="red.500" fontSize="sm" mt={1}>
            {error}
          </PizzaText>
        )}
      </Box>
    );
  }
);

PizzaInput.displayName = "PizzaInput";
