import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      bg="yellow.100"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Box>
  );
}
