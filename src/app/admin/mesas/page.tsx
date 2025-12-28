"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import { Box, Tabs } from "@chakra-ui/react";
import { DashboardMesas } from "@/features/mesas";
import { TablesList } from "@/features/pedidos/components";

export default function AdminMesasPage() {
  return (
    <AdminRoute>
      <Box p={8}>
        <Tabs.Root defaultValue="mesas" variant="enclosed">
          <Tabs.List>
            <Tabs.Trigger value="mesas">Gerenciar Mesas</Tabs.Trigger>
            <Tabs.Trigger value="pedidos">Pedidos de Mesa</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="mesas">
            <DashboardMesas />
          </Tabs.Content>
          <Tabs.Content value="pedidos">
            <TablesList />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </AdminRoute>
  );
}
