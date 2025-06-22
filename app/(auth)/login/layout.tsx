import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      bgGradient="linear(to-br, brand.yellow, brand.red)"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Box>
  );
}