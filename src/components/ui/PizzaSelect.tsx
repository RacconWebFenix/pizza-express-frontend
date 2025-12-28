"use client";

import { Box } from "@chakra-ui/react";
import { forwardRef } from "react";
import { PizzaText } from "./PizzaText";

interface PizzaSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const PizzaSelect = forwardRef<HTMLSelectElement, PizzaSelectProps>(
  ({ label, error, required, children, ...props }, ref) => {
    return (
      <Box w="full">
        {label && (
          <PizzaText color="gray.300" mb={2} fontSize="sm" fontWeight="medium">
            {label}
            {required && (
              <PizzaText as="span" color="red.500" ml={1}>
                *
              </PizzaText>
            )}
          </PizzaText>
        )}

        <select
          ref={ref}
          style={{
            backgroundColor: "#2D3748",
            borderColor: "#4A5568",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #4A5568",
            width: "100%",
            fontSize: "14px",
            fontFamily: "inherit",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#718096";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#4A5568";
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#D92B2B";
            e.currentTarget.style.boxShadow = "0 0 0 1px #D92B2B";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#4A5568";
            e.currentTarget.style.boxShadow = "none";
          }}
          {...props}
        >
          {children}
        </select>

        {error && (
          <PizzaText color="red.500" fontSize="sm" mt={1}>
            {error}
          </PizzaText>
        )}
      </Box>
    );
  }
);

PizzaSelect.displayName = "PizzaSelect";
