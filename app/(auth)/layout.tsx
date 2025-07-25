import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      // Alterado para um fundo neutro, alinhado com o novo design
      bg="gray.50"
      _dark={{ bg: "gray.900" }} // Fundo para o modo escuro
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4} // Garante um espaçamento nas bordas da tela
    >
      {children}
    </Box>
  );
}
