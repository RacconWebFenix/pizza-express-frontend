"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function AdminUsersPage() {
  return (
    <AdminRoute>
      <Box p={8}>
        <Heading mb={4}>Gerenciar Usuários</Heading>
        <Text>Área administrativa para gerenciamento de usuários.</Text>
        <Text color="text.secondary" mt={2}>
          Esta funcionalidade será implementada em breve.
        </Text>
      </Box>
    </AdminRoute>
  );
}
