// src/components/ui/PizzaButton.tsx
"use client";

import { Button, ButtonProps, Flex, Icon } from "@chakra-ui/react";
import { ElementType } from "react";

interface PizzaButtonProps extends ButtonProps {
  icon?: ElementType;
}

// Um botão genérico que aceita um ícone e texto de forma limpa
export const PizzaButton = ({ icon, children, ...props }: PizzaButtonProps) => {
  return (
    <Button {...props}>
      <Flex align="center" gap="2">
        {icon && <Icon as={icon} />}
        {children}
      </Flex>
    </Button>
  );
};
