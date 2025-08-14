"use client";

import {
  SimpleGrid,
  Stat, // Importa apenas o objeto principal 'Stat'
} from "@chakra-ui/react";
import { PizzaLoading } from "@/components/ui";

interface DashboardStatsProps {
  stats: {
    faturamentoTotal: string;
    pedidosHoje: string;
    totalDePedidos: string;
    ticketMedio: string;
  };
  isLoading: boolean;
}

export const DashboardStats = ({ stats, isLoading }: DashboardStatsProps) => {
  if (isLoading) {
    return <PizzaLoading message="Calculando estatísticas..." />;
  }
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
      {/* CORREÇÃO DEFINITIVA: Usando a sintaxe de componente composto para Stat */}
      <Stat.Root
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
      >
        <Stat.Label>Faturamento Total</Stat.Label>
        <Stat.ValueText>{stats.faturamentoTotal}</Stat.ValueText>
      </Stat.Root>
      <Stat.Root
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
      >
        <Stat.Label>Pedidos Hoje</Stat.Label>
        <Stat.ValueText>{stats.pedidosHoje}</Stat.ValueText>
      </Stat.Root>
      <Stat.Root
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
      >
        <Stat.Label>Total de Pedidos</Stat.Label>
        <Stat.ValueText>{stats.totalDePedidos}</Stat.ValueText>
      </Stat.Root>
      <Stat.Root
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
      >
        <Stat.Label>Ticket Médio</Stat.Label>
        <Stat.ValueText>{stats.ticketMedio}</Stat.ValueText>
      </Stat.Root>
    </SimpleGrid>
  );
};
