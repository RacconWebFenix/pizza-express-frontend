"use client";

import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const AccessDeniedPage = () => {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgGradient="linear(to-br, brand.secondary, brand.primary)"
        color="white"
      >
        <Flex direction="column" gap={4} textAlign="center" align="center">
          <Heading size="xl">Acesso Negado</Heading>
          <Text fontSize="lg">
            Você não tem permissão para acessar esta página.
          </Text>
          <Button colorScheme="yellow" onClick={handleGoToLogin}>
            Ir para Login
          </Button>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default AccessDeniedPage;
