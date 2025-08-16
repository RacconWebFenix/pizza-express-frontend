// src/components/ui/PizzaButton.tsx

"use client";

import { Button, ButtonProps, Flex, Icon } from "@chakra-ui/react";
import { ElementType } from "react";

interface PizzaButtonProps extends ButtonProps {
  icon?: ElementType;
}

export const PizzaButton = ({
  icon,
  children,
  // ALTERADO: O valor padrão agora é "solid", que é um tipo válido para o Button do Chakra
  variant = "solid",
  size = "md",
  ...props
}: PizzaButtonProps) => {
  return (
    <Button variant={variant} size={size} {...props}>
      <Flex align="center" gap="2">
        {icon && <Icon as={icon} />}
        {children}
      </Flex>
    </Button>
  );
};
