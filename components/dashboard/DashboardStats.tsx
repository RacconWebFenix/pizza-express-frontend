"use client";

import {
  SimpleGrid,
  Box,
  Text,
  Flex,
  Icon,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPizzaSlice, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { formatCurrency } from "../../utils/format";
import { DASHBOARD_CONSTANTS } from "../../constants/dashboard";

const MotionBox = motion(Box);

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  index: number;
}

function StatsCard({ title, value, icon, index }: StatsCardProps) {
  const { ANIMATIONS } = DASHBOARD_CONSTANTS;

  return (
    <MotionBox
      initial={ANIMATIONS.FADE_IN.initial}
      animate={ANIMATIONS.FADE_IN.animate}
      transition={{ ...ANIMATIONS.FADE_IN.transition, delay: index * 0.1 }}
      bg="white"
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      // ESTILO ATUALIZADO para consistência visual
      borderTop="4px solid"
      borderColor="brand.primary"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
      }}
      _dark={{ bg: "gray.800", borderColor: "brand.secondary" }}
      style={{ transition: "all 0.2s ease-in-out" }}
    >
      <Flex align="center" justify="space-between">
        <VStack align="start">
          <Text
            fontSize="md"
            color="gray.600"
            fontWeight="medium"
            _dark={{ color: "gray.400" }}
          >
            {title}
          </Text>
          <Text
            fontSize="3xl"
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "white" }}
          >
            {value}
          </Text>
        </VStack>
        <Icon
          as={icon}
          boxSize={8}
          color="gray.300"
          _dark={{ color: "gray.500" }}
        />
      </Flex>
    </MotionBox>
  );
}

interface DashboardStatsProps {
  stats: {
    totalPizzas: number;
    pedidosHoje: number;
    receitaTotal: number;
    pizzasMaisVendidas: string;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const { GRID } = DASHBOARD_CONSTANTS;

  const statsData = [
    { title: "Total de Pizzas", value: stats.totalPizzas, icon: FaPizzaSlice },
    { title: "Pedidos Hoje", value: stats.pedidosHoje, icon: FaShoppingCart },
    {
      title: "Receita Total",
      value: formatCurrency(stats.receitaTotal),
      icon: FaChartLine,
    },
  ];

  return (
    <Box>
      <Heading size="lg" color="gray.700" _dark={{ color: "white" }} mb={4}>
        Estatísticas
      </Heading>
      <SimpleGrid columns={GRID.STATS_COLUMNS} gap={GRID.GAP}>
        {statsData.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            index={index}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
