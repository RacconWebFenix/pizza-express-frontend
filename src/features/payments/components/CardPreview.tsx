// src/features/payments/components/CardPreview.tsx

"use client";

import React, { useMemo } from "react";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import {
  FaCreditCard,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
} from "react-icons/fa";

const detectCardType = (number: string): string => {
  const cleaned = number.replace(/\s/g, "");
  if (/^4/.test(cleaned)) return "visa";
  if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return "mastercard";
  if (/^3[47]/.test(cleaned)) return "american-express";
  if (/^6(?:011|5)/.test(cleaned)) return "discover";
  return "unknown";
};

interface CardPreviewProps {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  focused?: "number" | "name" | "expiry" | "cvc";
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  number,
  name,
  expiry,
  cvc,
  focused,
}) => {
  const cardType = useMemo(() => {
    return detectCardType(number);
  }, [number]);

  const getCardIcon = () => {
    switch (cardType) {
      case "visa":
        return <FaCcVisa size={24} color="#1A1F71" />;
      case "mastercard":
        return <FaCcMastercard size={24} color="#EB001B" />;
      case "american-express":
        return <FaCcAmex size={24} color="#006FCF" />;
      default:
        return <FaCreditCard size={24} color="#666" />;
    }
  };

  const formatCardNumber = (num: string) => {
    const cleaned = num.replace(/\s/g, "");
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.join(" ").padEnd(19, "•");
  };

  const formatExpiry = (exp: string) => {
    const cleaned = exp.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <Box
      w="350px"
      h="220px"
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      borderRadius="lg"
      p={6}
      color="white"
      position="relative"
      boxShadow="lg"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.02)" }}
    >
      {/* Chip do cartão */}
      <Box
        w="12"
        h="8"
        bg="linear-gradient(45deg, #FFD700 0%, #FFA500 100%)"
        borderRadius="sm"
        mb={4}
      />

      {/* Número do cartão */}
      <Text
        fontSize="xl"
        fontFamily="mono"
        letterSpacing="wide"
        mb={4}
        opacity={focused === "number" ? 1 : 0.9}
      >
        {formatCardNumber(number)}
      </Text>

      {/* Nome e validade */}
      <HStack justify="space-between" align="flex-end">
        <VStack align="flex-start" gap={1}>
          <Text fontSize="xs" opacity={0.7} textTransform="uppercase">
            Card Holder
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            opacity={focused === "name" ? 1 : 0.9}
          >
            {name || "NOME COMPLETO"}
          </Text>
        </VStack>

        <VStack align="flex-end" gap={1}>
          <Text fontSize="xs" opacity={0.7} textTransform="uppercase">
            Expires
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            opacity={focused === "expiry" ? 1 : 0.9}
          >
            {formatExpiry(expiry) || "MM/YY"}
          </Text>
        </VStack>
      </HStack>

      {/* Ícone da bandeira */}
      <Box position="absolute" top={4} right={4}>
        {getCardIcon()}
      </Box>

      {/* CVC (verso do cartão) */}
      {focused === "cvc" && (
        <Box
          position="absolute"
          top="50%"
          right={4}
          transform="translateY(-50%)"
          bg="black"
          px={3}
          py={1}
          borderRadius="sm"
        >
          <Text fontSize="sm" fontFamily="mono">
            {cvc.padEnd(3, "•")}
          </Text>
        </Box>
      )}
    </Box>
  );
};
