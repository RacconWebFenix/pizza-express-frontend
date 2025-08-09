"use client";

import {
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  VStack,
  Button,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { Utensils, ClipboardList, Pizza } from "lucide-react";

// A interface de props agora é explícita e não depende mais do tipo do hook
interface DashboardContentProps {
  stats: {
    faturamentoTotal: string;
    pedidosHoje: string;
    totalDePedidos: string;
    ticketMedio: string;
  };
  handleNavigateToPedidos: () => void;
  handleNavigateToCardapio: () => void;
  onShowGerenciarCardapio: () => void;
}

/**
 * Componente visual principal do Dashboard.
 * Agora corrigido para a sintaxe do Chakra UI v3.
 */
export const DashboardContent = ({
  stats,
  handleNavigateToPedidos,
  handleNavigateToCardapio,
  onShowGerenciarCardapio,
}: DashboardContentProps) => {
  return (
    <VStack gap={8} align="stretch">
      <Heading as="h1" size="xl">
        Dashboard
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
        {/* O componente Stat é usado como um container */}
        <Stat.Root p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <StatLabel>Faturamento Total</StatLabel>
          <Stat.ValueText>{stats.faturamentoTotal}</Stat.ValueText>
        </Stat.Root>
        <Stat.Root p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <StatLabel>Pedidos Hoje</StatLabel>
          <Stat.ValueText>{stats.pedidosHoje}</Stat.ValueText>
        </Stat.Root>
        <Stat.Root p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <StatLabel>Total de Pedidos</StatLabel>
          <Stat.ValueText>{stats.totalDePedidos}</Stat.ValueText>
        </Stat.Root>
        <Stat.Root p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <StatLabel>Ticket Médio</StatLabel>
          <Stat.ValueText>{stats.ticketMedio}</Stat.ValueText>
        </Stat.Root>
      </SimpleGrid>

      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <Button onClick={handleNavigateToPedidos} size="lg" flex="1">
          <Flex align="center" gap="2">
            <Icon as={ClipboardList} />
            <Text>Ver Pedidos</Text>
          </Flex>
        </Button>
        <Button onClick={handleNavigateToCardapio} size="lg" flex="1">
          <Flex align="center" gap="2">
            <Icon as={Utensils} />
            <Text>Ver Cardápio</Text>
          </Flex>
        </Button>
        <Button
          onClick={onShowGerenciarCardapio}
          size="lg"
          colorScheme="orange"
          flex="1"
        >
          <Flex align="center" gap="2">
            <Icon as={Pizza} />
            <Text>Gerenciar Cardápio</Text>
          </Flex>
        </Button>
      </Flex>
    </VStack>
  );
};
