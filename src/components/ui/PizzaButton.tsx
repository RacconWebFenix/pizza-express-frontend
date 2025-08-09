"use client";

import { Button, ButtonProps } from "@chakra-ui/react";

type PizzaButtonVariant = "primary" | "pizza" | "ghost" | "outline" | "solid";

interface PizzaButtonProps extends Omit<ButtonProps, "variant"> {
  variant?: PizzaButtonVariant;
}

export function PizzaButton({
  variant = "primary",
  className = "",
  ...props
}: PizzaButtonProps) {
  // Mapeia variantes customizadas para classes do tema
  const variantClass =
    variant === "pizza"
      ? "button-pizza"
      : variant === "primary"
      ? "button-primary"
      : variant === "ghost"
      ? "button-ghost"
      : "";
  // Usa variant do Chakra apenas para tipos aceitos
  const chakraVariant: ButtonProps["variant"] =
    variant === "outline" || variant === "ghost" || variant === "solid"
      ? variant
      : "solid";
  return (
    <Button
      variant={chakraVariant}
      className={`${variantClass} ${className}`}
      {...props}
    />
  );
}
