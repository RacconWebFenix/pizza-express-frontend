// /components/dashboard/DashboardStats.tsx
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { FiDollarSign, FiPackage, FiClipboard } from "react-icons/fi";
import { ReactElement } from "react";

interface StatCardProps {
  title: string;
  stat: string;
  icon: ReactElement;
  iconBg: string;
}

interface DashboardStatsProps {
  stats: {
    faturamentoDia: string;
    pedidosHoje: string;
    ticketMedio: string;
  };
}

function StatCard({ title, stat, icon, iconBg }: StatCardProps) {
  return (
    <Flex
      p={5}
      bg="gray.900"
      color="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.700"
      alignItems="center"
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "lg",
        borderColor: "gray.600",
      }}
    >
      <Box mr={4} p={3} borderRadius="lg" bg={iconBg} color="white">
        {icon}
      </Box>
      <Box>
        <Text fontFamily="body" fontWeight="medium" color="whiteAlpha.700">
          {title}
        </Text>
        <Text
          fontFamily="heading"
          fontSize="2xl"
          fontWeight="bold"
          color="whiteAlpha.900"
        >
          {stat}
        </Text>
      </Box>
    </Flex>
  );
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 5, lg: 8 }}>
      <StatCard
        title={"Faturamento do Dia"}
        stat={stats.faturamentoDia}
        icon={<FiDollarSign size={"24px"} />}
        iconBg="green.500"
      />
      <StatCard
        title={"Pedidos Hoje"}
        stat={stats.pedidosHoje}
        icon={<FiPackage size={"24px"} />}
        iconBg="blue.500"
      />
      <StatCard
        title={"Ticket Médio"}
        stat={stats.ticketMedio}
        icon={<FiClipboard size={"24px"} />}
        iconBg="orange.500"
      />
    </SimpleGrid>
  );
}
