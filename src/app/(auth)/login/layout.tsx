import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
      // Fundo mais neutro e elegante, inspirado no overlay do modal
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      {children}
    </Box>
  );
}
