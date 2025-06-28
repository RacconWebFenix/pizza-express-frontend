"use client";

import {
  Box,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";

interface CardapioFooterProps {
  onVerPedidos: () => void;
}

export function CardapioFooter({ onVerPedidos }: CardapioFooterProps) {
  return (
    <Box bg="white" borderRadius="xl" boxShadow="lg" p={6} textAlign="center">
      <Heading size="md" color="brand.primary" mb={4}>
        Gostou do nosso cardápio?
      </Heading>
      <Text color="brand.medium" mb={4}>
        Faça seu pedido e desfrute das melhores pizzas da cidade!
      </Text>
      <Button
        bg="brand.success"
        color="white"
        size="lg"
        _hover={{ bg: "brand.accent" }}
        onClick={onVerPedidos}
      >
        Ver Meus Pedidos
      </Button>
    </Box>
  );
}