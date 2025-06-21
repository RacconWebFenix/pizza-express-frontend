"use client";

import { Box, Heading, VStack, Image, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAuth } from "../../components/auth/auth-context";
import { useRouter } from "next/navigation";

const WelcomePage = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
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
        bgGradient="linear(to-br, brand.yellow, brand.red)"
      >
        <VStack
          gap={4}
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          maxWidth="400px"
          w="full"
        >
          <Heading color="brand.red">Bem-vindo ao Pizza Express!</Heading>
          <Image src="/pizza-icon.svg" alt="Ícone de Pizza" boxSize="100px" />
          <Button
            bg="brand.red"
            color="white"
            _hover={{ bg: "brand.charcoal" }}
            onClick={handleLogout}
            width="full"
          >
            Logout
          </Button>
        </VStack>
      </Box>
    </motion.div>
  );
};

export default WelcomePage;
