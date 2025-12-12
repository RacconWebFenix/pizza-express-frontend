"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import { Box } from "@chakra-ui/react";
import { DashboardMesas } from "@/features/mesas";

export default function AdminMesasPage() {
  return (
    <AdminRoute>
      <Box p={8}>
        <DashboardMesas />
      </Box>
    </AdminRoute>
  );
}