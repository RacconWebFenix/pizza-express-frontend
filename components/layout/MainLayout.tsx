"use client";

import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Header from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box minH="100vh" bg="brand.cream">
      <Header />
      <Box as="main" maxW="1200px" mx="auto" p={4}>
        {children}
      </Box>
    </Box>
  );
}
