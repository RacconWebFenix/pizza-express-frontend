"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import { Box } from "@chakra-ui/react";
import { EntregadoresList } from "@/features/entregadores";

export default function AdminDeliveryPersonsPage() {
  return (
    <AdminRoute>
      <Box p={8}>
        <EntregadoresList />
      </Box>
    </AdminRoute>
  );
}
