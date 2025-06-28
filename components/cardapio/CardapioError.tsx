"use client";

import {
  Box,
  Text,
} from "@chakra-ui/react";

interface CardapioErrorProps {
  error: string;
}

export function CardapioError({ error }: CardapioErrorProps) {
  return (
    <Box
      bg="yellow.200"
      minH="100vh"
      borderRadius="lg"
      p={4}
      border="2px"
      borderColor="red.200"
      textAlign="center"
    >
      <Text color="red.600" fontWeight="bold">
        {error}
      </Text>
    </Box>
  );
}