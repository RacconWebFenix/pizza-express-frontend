"use client";

import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box bg="gray.900" color="white">
      <Header />
      <Box as="main" minH="calc(100vh - 64px)" p={{ base: 4, md: 8 }}>
        {children}
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}
