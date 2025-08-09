"use client";

import { Box, Heading, Text, Button } from "@chakra-ui/react";

interface CardapioFooterProps {
  onVerPedidos: () => void;
}

export function CardapioFooter({ onVerPedidos }: CardapioFooterProps) {
  return (
    <Box
      bg="gray.800"
      color="white"
      borderRadius="xl"
      boxShadow="2xl"
      p={{ base: 6, md: 8 }}
      textAlign="center"
      mt={8}
    >
      <Heading size="lg" color="whiteAlpha.900" mb={3}>
        Pronto para pedir?
      </Heading>
      <Text color="whiteAlpha.700" fontSize="lg" mb={6}>
        Clique no botão abaixo para ver seus pedidos e finalizar a compra.
      </Text>
      <Button
        colorScheme="orange"
        size="lg"
        px={8}
        onClick={onVerPedidos}
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.2s"
      >
        Ver Meus Pedidos
      </Button>
    </Box>
  );
}
