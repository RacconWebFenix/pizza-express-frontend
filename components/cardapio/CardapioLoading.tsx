"use client";

import {
  Box,
  Spinner,
  Text,
} from "@chakra-ui/react";

export function CardapioLoading() {
  return (
    <Box bg="yellow.200" minH="100vh" textAlign="center" py={12}>
      <Spinner size="xl" color="brand.accent" />
      <Text mt={4} color="brand.medium">
        Carregando cardápio...
      </Text>
    </Box>
  );
}