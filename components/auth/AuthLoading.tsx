"use client";

import { Box, Spinner, VStack, Text } from "@chakra-ui/react";

interface AuthLoadingProps {
  message?: string;
}

export default function AuthLoading({
  message = "Verificando autenticação...",
}: AuthLoadingProps) {
  return (
    <Box
      bg="brand.light"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack gap={4}>
        <Spinner size="xl" color="brand.primary" />
        <Text color="brand.medium" fontSize="lg">
          {message}
        </Text>
      </VStack>
    </Box>
  );
}
