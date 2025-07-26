"use client";

import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box>
      <Header />
      <Box as="main" p={4}>
        {children}
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}
