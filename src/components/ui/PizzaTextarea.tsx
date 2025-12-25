"use client";

import { Textarea, TextareaProps, Box } from "@chakra-ui/react";
import { forwardRef } from "react";
import { PizzaText } from "./PizzaText";

interface PizzaTextareaProps extends Omit<TextareaProps, "size"> {
  label?: string;
  error?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
}

export const PizzaTextarea = forwardRef<
  HTMLTextAreaElement,
  PizzaTextareaProps
>(({ label, error, required, size = "md", ...props }, ref) => {
  const sizeStyles = {
    sm: {
      fontSize: "sm",
      px: 3,
      py: 2,
      minH: "80px",
    },
    md: {
      fontSize: "md",
      px: 4,
      py: 3,
      minH: "100px",
    },
    lg: {
      fontSize: "lg",
      px: 5,
      py: 4,
      minH: "120px",
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

      <Textarea
        ref={ref}
        bg="white"
        color="gray.800"
        border="2px solid"
        borderColor={error ? "red.300" : "gray.300"}
        borderRadius="md"
        caretColor="gray.800"
        css={{
          "&::selection": {
            backgroundColor: "#007bff",
            color: "#ffffff",
          },
        }}
        resize="vertical"
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
          caretColor: "gray.800",
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
});

PizzaTextarea.displayName = "PizzaTextarea";
