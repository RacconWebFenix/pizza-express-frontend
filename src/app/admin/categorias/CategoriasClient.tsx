"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import { Box } from "@chakra-ui/react";
import { CategoriasList } from "@/features/categorias";

export default function AdminCategoriasPage() {
  return (
    <AdminRoute>
      <Box p={8}>
        <CategoriasList />
      </Box>
    </AdminRoute>
  );
}