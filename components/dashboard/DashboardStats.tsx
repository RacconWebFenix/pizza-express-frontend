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

function StatCard({ title, stat, icon, iconBg }: StatCardProps) {
  return (
    <Flex
      p={5}
      bg="brand.surface"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      alignItems="center"
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "lg",
      }}
    >
      <Box mr={4} p={3} borderRadius="lg" bg={iconBg} color="white">
        {icon}
      </Box>
      <Box>
        <Text
          fontFamily="body"
          fontWeight="medium"
          // CORREÇÃO: Trocamos 'brand.textSecondary' por um cinza mais escuro e legível
          color="gray.600"
        >
          {title}
        </Text>
        <Text
          fontFamily="heading"
          fontSize="2xl"
          fontWeight="bold"
          // Garantindo que o texto principal seja bem escuro
          color="brand.textPrimary"
        >
          {stat}
        </Text>
      </Box>
    </Flex>
  );
}

export function DashboardStats() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 5, lg: 8 }}>
      <StatCard
        title={"Faturamento do Dia"}
        stat={"R$ 1.250,00"}
        icon={<FiDollarSign size={"24px"} />}
        iconBg="brand.secondary"
      />
      <StatCard
        title={"Pedidos Hoje"}
        stat={"42"}
        icon={<FiPackage size={"24px"} />}
        iconBg="brand.accent"
      />
      <StatCard
        title={"Ticket Médio"}
        stat={"R$ 29,76"}
        icon={<FiClipboard size={"24px"} />}
        iconBg="brand.primary"
      />
    </SimpleGrid>
  );
}
