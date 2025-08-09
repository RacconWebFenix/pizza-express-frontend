import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

// Este será o layout principal para todas as telas de autenticação.
// Ele cria um fundo gradiente e centraliza o conteúdo.
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
