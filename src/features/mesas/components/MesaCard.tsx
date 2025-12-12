"use client";

import React, { useState } from "react";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { FaChair, FaClock } from "react-icons/fa";
import { MesaStatus, Mesa } from "@/types/mesa";

interface MesaCardProps {
  mesa: Mesa;
  onClick: () => void;
}

export const MesaCard: React.FC<MesaCardProps> = ({ mesa, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusConfig = (status: MesaStatus) => {
    switch (status) {
      case "AVAILABLE":
        return {
          bg: "green.500",
          borderColor: "green.300",
          badgeBg: "green.50",
          badgeColor: "green.600",
          label: "Livre",
        };
      case "OCCUPIED":
        return {
          bg: "red.500",
          borderColor: "red.300",
          badgeBg: "red.50",
          badgeColor: "red.600",
          label: "Ocupada",
        };
      case "RESERVED":
        return {
          bg: "yellow.500",
          borderColor: "yellow.300",
          badgeBg: "yellow.50",
          badgeColor: "yellow.600",
          label: "Reservada",
        };
      default:
        return {
          bg: "gray.500",
          borderColor: "gray.300",
          badgeBg: "gray.50",
          badgeColor: "gray.600",
          label: "Desconhecido",
        };
    }
  };

  const statusConfig = getStatusConfig(mesa.status);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) {
      return `${diffMins}min`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours}h ${diffMins % 60}min`;
    }
  };

  return (
    <Box w="full" aspectRatio="1" position="relative">
      <Button
        w="100%"
        h="100%"
        p={3}
        bg={statusConfig.bg}
        border="2px solid"
        borderColor={statusConfig.borderColor}
        borderRadius="12px"
        color="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        onClick={onClick}
        transition="all 0.2s"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          opacity: 0.9,
        }}
        _active={{
          transform: "scale(0.95)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <VStack gap={2} w="full" justify="center" align="center">
          {/* Ícone da cadeira */}
          <Box fontSize="24px">
            <FaChair />
          </Box>

          {/* Número da mesa */}
          <Text fontSize="20px" fontWeight="bold">
            {mesa.number}
          </Text>

          {/* Status Badge */}
          <Box
            bg={statusConfig.badgeBg}
            color={statusConfig.badgeColor}
            fontSize="12px"
            px={2}
            py={1}
            borderRadius="9999px"
            fontWeight="600"
          >
            {statusConfig.label}
          </Box>

          {/* Tempo de ocupação (se ocupada) */}
          {mesa.status === "OCCUPIED" && mesa.sessaoAtiva && (
            <Flex align="center" gap={1} fontSize="12px">
              <FaClock />
              <span>{formatTime(mesa.sessaoAtiva.criadoEm)}</span>
            </Flex>
          )}

          {/* Número de pedidos (se ocupada) */}
          {mesa.status === "OCCUPIED" && mesa.sessaoAtiva && (
            <Box
              bg={statusConfig.badgeBg}
              color={statusConfig.badgeColor}
              fontSize="12px"
              px={2}
              py={1}
              borderRadius="9999px"
              fontWeight="600"
            >
              {mesa.sessaoAtiva.pedidos?.length || 0} pedidos
            </Box>
          )}
        </VStack>
      </Button>
    </Box>
  );
};
