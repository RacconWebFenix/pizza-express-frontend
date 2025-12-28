"use client";

import { Box } from "@chakra-ui/react";
import { forwardRef } from "react";
import { PizzaText } from "./PizzaText";

interface PizzaCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export const PizzaCheckbox = forwardRef<HTMLInputElement, PizzaCheckboxProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <Box w="full">
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#A0AEC0",
            cursor: "pointer",
          }}
        >
          <input
            ref={ref}
            type="checkbox"
            style={{
              accentColor: "#D92B2B",
              width: "16px",
              height: "16px",
              cursor: "pointer",
            }}
            {...props}
          />
          {label && (
            <PizzaText color="gray.300" fontSize="sm">
              {label}
            </PizzaText>
          )}
        </label>

        {error && (
          <PizzaText color="red.500" fontSize="sm" mt={1}>
            {error}
          </PizzaText>
        )}
      </Box>
    );
  }
);

PizzaCheckbox.displayName = "PizzaCheckbox";
