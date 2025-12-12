"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import { Box } from "@chakra-ui/react";
import { ProdutosList } from "@/features/produtos";

export default function AdminProdutosPage() {
  return (
    <AdminRoute>
      <Box p={8}>
        <ProdutosList />
      </Box>
    </AdminRoute>
  );
}