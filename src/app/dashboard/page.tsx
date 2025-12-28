"use client";

import { Box, VStack } from "@chakra-ui/react";
import { DollarSign, ListOrdered, BarChart, ShoppingCart } from "lucide-react";

import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { DashboardActions } from "@/features/dashboard/components/DashboardActions";

import { useDashboardStats } from "@/features/dashboard/hooks/useDashboard";

export default function DashboardPage() {
  const { stats, isLoading: isLoadingStats } = useDashboardStats();

  // Criamos o array de estatísticas com os ícones
  const formattedStats = [
    {
      label: "Faturamento Total",
      value: stats.faturamentoTotal,
      icon: DollarSign,
    },
    { label: "Pedidos Hoje", value: stats.pedidosHoje, icon: ShoppingCart },
    {
      label: "Total de Pedidos",
      value: stats.totalDePedidos,
      icon: ListOrdered,
    },
    { label: "Ticket Médio", value: stats.ticketMedio, icon: BarChart },
  ];

  return (
    <Box w="full" minH="100vh" bg="background.primary" p={{ base: 4, md: 8 }}>
      <VStack gap={8} align="stretch">
        <DashboardStats stats={formattedStats} isLoading={isLoadingStats} />
        <DashboardActions />
      </VStack>
    </Box>
  );
}
