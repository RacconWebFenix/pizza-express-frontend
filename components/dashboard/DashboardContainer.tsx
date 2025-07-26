// /components/dashboard/DashboardContainer.tsx
"use client";

import { Box } from "@chakra-ui/react";
import { DashboardContent } from "./DashboardContent";
import { useDashboard } from "@/hooks/useDashboard";

// O Container agora é um componente "burro", apenas renderiza o conteúdo.
export function DashboardContainer() {
  const dashboardProps = useDashboard();

  return (
    <Box>
      {/* Removemos o DashboardHeader daqui */}
      <DashboardContent {...dashboardProps} />
    </Box>
  );
}
