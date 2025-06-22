"use client";

import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigateToWelcome = () => {
    router.push("/welcome");
  };

  return (
    <Box
      bg="brand.cream"
      minH="100vh"
      p={8}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        direction="column"
        gap="6"
        align="center"
        maxW="600px"
        textAlign="center"
      >
        <Heading color="brand.red" size="2xl">
          Bem-vindo à Pizzaria Express!
        </Heading>
        <Text color="brand.charcoal" fontSize="lg">
          Descubra as melhores pizzas feitas com ingredientes frescos e direto
          do forno a lenha.
        </Text>
        <Button
          bg="brand.green"
          color="white"
          size="lg"
          _hover={{ bg: "brand.yellow" }}
          onClick={handleNavigateToWelcome}
        >
          Ver Cardápio
        </Button>
      </Flex>
    </Box>
  );
}
