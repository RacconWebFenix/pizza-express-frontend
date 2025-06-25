"use client";

import { Box, Heading, Text, Button, Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaPizzaSlice, FaLeaf, FaFire } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const handleNavigateToWelcome = () => {
    router.push("/cardapio");
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
          <Flex align="center" gap="2">
            <Icon as={FaPizzaSlice} boxSize={8} color="brand.green" />
            Bem-vindo à Pizzaria Express!
          </Flex>
        </Heading>
        <Text color="brand.charcoal" fontSize="lg">
          Descubra as melhores pizzas feitas com ingredientes frescos{" "}
          <Icon as={FaLeaf} boxSize={5} color="brand.green" /> e direto do forno
          a lenha <Icon as={FaFire} boxSize={5} color="brand.yellow" />.
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
