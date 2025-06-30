"use client";

import { SimpleGrid, Box, Text, Flex, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPizzaSlice, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { formatCurrency } from "../../utils/format";
import { DASHBOARD_CONSTANTS } from "../../constants/dashboard";

const MotionBox = motion(Box);

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  index: number;
}

function StatsCard({ title, value, icon, color, index }: StatsCardProps) {
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
      border="2px solid"
      borderColor="brand.pizza"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
      }}
      style={{ transition: "all 0.3s ease" }}
    >
      <Flex align="center" gap={4}>
        <Box bg={color} p={3} borderRadius="lg" color="white" fontSize="xl">
          <Icon as={icon} />
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.600" fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="brand.dark">
            {value}
          </Text>
        </Box>
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
  const { GRID, TITLES } = DASHBOARD_CONSTANTS;

  const statsData = [
    {
      title: "Total de Pizzas",
      value: stats.totalPizzas,
      icon: FaPizzaSlice,
      color: "brand.pizza",
    },
    {
      title: "Pedidos Hoje",
      value: stats.pedidosHoje,
      icon: FaShoppingCart,
      color: "brand.fresh",
    },
    {
      title: "Receita Total",
      value: formatCurrency(stats.receitaTotal),
      icon: FaChartLine,
      color: "brand.warning",
    },
    {
      title: "Mais Vendida",
      value: stats.pizzasMaisVendidas,
      icon: FaPizzaSlice,
      color: "brand.success",
    },
  ];

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="brand.dark" mb={4}>
        {TITLES.STATS}
      </Text>
      <SimpleGrid columns={GRID.STATS_COLUMNS} gap={GRID.GAP}>
        {statsData.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            index={index}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
