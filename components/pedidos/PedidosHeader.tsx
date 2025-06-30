"use client";

import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { PEDIDOS_CONSTANTS } from "../../constants/pedidos";

const MotionBox = motion(Box);

interface PedidosHeaderProps {
  totalPedidos: number;
  selectedStatus: string;
  onStatusFilter: (status: string) => void;
}

export function PedidosHeader({
  totalPedidos,
  selectedStatus,
  onStatusFilter,
}: PedidosHeaderProps) {
  const { TITLES, FILTERS, ANIMATIONS } = PEDIDOS_CONSTANTS;

  return (
    <MotionBox
      initial={ANIMATIONS.FADE_IN.initial}
      animate={ANIMATIONS.FADE_IN.animate}
      transition={ANIMATIONS.FADE_IN.transition}
    >
      <Box textAlign="center" mb={8}>
        <Heading
          fontSize={{ base: "2xl", md: "4xl" }}
          color="brand.dark"
          mb={2}
          fontWeight="bold"
        >
          {TITLES.MAIN}
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="brand.medium"
          fontWeight="medium"
        >
          Total de {totalPedidos} pedidos
        </Text>
      </Box>

      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        boxShadow="md"
        border="2px solid"
        borderColor="brand.pizza"
      >
        <Text fontSize="lg" fontWeight="bold" color="brand.dark" mb={4}>
          {TITLES.FILTERS}
        </Text>
        <Flex gap={2} wrap="wrap" justify="center">
          {FILTERS.map((filter) => (
            <Button
              key={filter.value}
              onClick={() => onStatusFilter(filter.value)}
              colorScheme={selectedStatus === filter.value ? "blue" : "gray"}
              variant={selectedStatus === filter.value ? "solid" : "outline"}
              size="sm"
              borderRadius="lg"
            >
              {filter.label}
            </Button>
          ))}
        </Flex>
      </Box>
    </MotionBox>
  );
}
