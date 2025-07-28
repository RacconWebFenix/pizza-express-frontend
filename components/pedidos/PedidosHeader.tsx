"use client";

import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const FILTERS: { label: string; value: string }[] = [
  { label: "Todos", value: "todos" },
  { label: "Preparando", value: "preparando" },
  { label: "Entregue", value: "entregue" },
  { label: "Cancelado", value: "cancelado" },
];

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
  return (
    <MotionBox
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box textAlign="center" mb={8}>
        <Heading
          fontSize={{ base: "3xl", md: "4xl" }}
          color="whiteAlpha.900"
          mb={2}
          fontWeight="bold"
        >
          Meus Pedidos
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="whiteAlpha.700"
          fontWeight="medium"
        >
          Total de {totalPedidos} pedidos
        </Text>
      </Box>

      <Box
        bg="gray.800"
        p={6}
        borderRadius="xl"
        boxShadow="lg"
        border="1px solid"
        borderColor="gray.700"
      >
        <Text fontSize="lg" fontWeight="bold" color="whiteAlpha.900" mb={4}>
          Filtrar por Status
        </Text>
        <Flex gap={3} wrap="wrap" justify="center">
          {FILTERS.map((filter) => (
            <Button
              key={filter.value}
              onClick={() => onStatusFilter(filter.value)}
              colorScheme={selectedStatus === filter.value ? "orange" : "gray"}
              variant={selectedStatus === filter.value ? "solid" : "outline"}
              size="sm"
              borderRadius="full"
              px={4}
            >
              {filter.label}
            </Button>
          ))}
        </Flex>
      </Box>
    </MotionBox>
  );
}
