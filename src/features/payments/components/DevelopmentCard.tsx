// src/features/payments/components/DevelopmentCard.tsx

"use client";

import React from "react";
import { Box, Text, VStack, Icon } from "@chakra-ui/react";
import { FaTools } from "react-icons/fa";

/**
 * Componente placeholder para funcionalidades em desenvolvimento
 * Segue os princípios SOLID (Single Responsibility) e Clean Code
 */
export const DevelopmentCard: React.FC = () => {
  return (
    <Box
      w="350px"
      h="220px"
      bg="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      borderRadius="lg"
      p={6}
      color="white"
      position="relative"
      boxShadow="lg"
      border="2px dashed"
      borderColor="whiteAlpha.600"
    >
      <VStack gap={4} align="center" justify="center" h="full">
        <Icon as={FaTools} boxSize="3rem" />
        <VStack gap={1} textAlign="center">
          <Text fontSize="lg" fontWeight="bold">
            Em Desenvolvimento
          </Text>
          <Text fontSize="sm" opacity={0.9}>
            Preview do cartão será implementado em breve
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};