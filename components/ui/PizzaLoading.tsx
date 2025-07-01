"use client";

import { Box, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { PizzaText } from "./PizzaText";
import Image from "next/image";

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface PizzaLoadingProps {
  message?: string;
  isVisible?: boolean;
}

export const PizzaLoading = ({
  message = "Carregando...",
  isVisible = true,
}: PizzaLoadingProps) => {
  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.8)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
      backdropFilter="blur(4px)"
    >
      <VStack gap={6}>
        <Image
          src="/pizza-icon.svg"
          alt="Pizza Loading"
          width={80}
          height={80}
          style={{
            animation: `${rotateAnimation} 2s linear infinite`,
          }}
        />

        <PizzaText
          variant="heading"
          color="white"
          fontSize="xl"
          textAlign="center"
        >
          {message}
        </PizzaText>
      </VStack>
    </Box>
  );
};
