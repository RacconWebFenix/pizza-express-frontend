"use client";

import { PizzaLoading } from "@/components/ui";
import { SimpleGrid, Stat, Flex, Icon, Box } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react"; // Usado para tipar o ícone

// A interface agora espera um array de objetos de estatísticas
interface StatCard {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface DashboardStatsProps {
  stats: StatCard[];
  isLoading: boolean;
}

export const DashboardStats = ({ stats, isLoading }: DashboardStatsProps) => {
  if (isLoading) {
    return <PizzaLoading message="Calculando estatísticas..." />;
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
      {stats.map((stat) => (
        <Stat.Root
          key={stat.label}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          bg="background.secondary"
          borderColor="background.tertiary"
        >
          <Flex alignItems="center">
            <Box flex="1">
              <Stat.Label color="text.secondary" fontSize="md">
                {stat.label}
              </Stat.Label>
              <Stat.ValueText fontSize="3xl" fontWeight="bold">
                {stat.value}
              </Stat.ValueText>
            </Box>
            <Flex
              alignItems="center"
              justifyContent="center"
              w={12}
              h={12}
              borderRadius="full"
              bg="background.primary"
            >
              <Icon as={stat.icon} w={6} h={6} color="brand.primary" />
            </Flex>
          </Flex>
        </Stat.Root>
      ))}
    </SimpleGrid>
  );
};
