"use client";

import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.50"
            _dark={{ bg: "gray.900" }}
        >
            <VStack gap={6}>
                <Heading size="2xl">404</Heading>
                <Text fontSize="xl">Página não encontrada</Text>
                <Button onClick={() => router.push("/")}>
                    Voltar para a página inicial
                </Button>
            </VStack>
        </Box>
    );
}
