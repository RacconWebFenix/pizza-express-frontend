"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  Avatar,
  Separator,
} from "@chakra-ui/react";
import { useProfile } from "../hooks/useProfile";
import { PizzaLoading } from "@/components/ui";

/**
 * Componente visual principal para a página de perfil.
 * Ele usa o hook 'useProfile' para buscar e exibir os dados.
 */
export const ProfilePageLayout = () => {
  const { user, isLoading, error } = useProfile();

  if (isLoading) {
    return <PizzaLoading message="Carregando seu perfil..." />;
  }

  if (error) {
    return (
      <Flex justify="center" align="center" h="100%">
        <Text color="red.500">Erro ao carregar o perfil: {error}</Text>
      </Flex>
    );
  }

  return (
    <VStack w="full" p={{ base: 4, md: 8 }} gap={6} align="stretch">
      <Heading as="h1" size="xl">
        Meu Perfil
      </Heading>

      {user && (
        <Box p={6} borderWidth="1px" borderRadius="lg" bg="white" shadow="sm">
          <Flex align="center" gap={4}>
            <Avatar.Root size="xl">
              <Avatar.Fallback>{user.nome.charAt(0)}</Avatar.Fallback>
              <Avatar.Image src={user.avatar || ""} alt={user.nome} />
            </Avatar.Root>
            <VStack align="start" gap={0}>
              <Heading size="lg">{user.nome}</Heading>
              <Text fontSize="md" color="gray.600">
                {user.email}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {user.telefone}
              </Text>
            </VStack>
          </Flex>

          <Separator my={6} />

          <Heading size="md" mb={4}>
            Meus Endereços
          </Heading>
          {user.enderecos && user.enderecos.length > 0 ? (
            <VStack align="stretch" gap={4}>
              {user.enderecos.map((endereco) => (
                <Box
                  key={endereco.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                >
                  <Text fontWeight="bold">
                    {endereco.logradouro}, {endereco.numero}
                  </Text>
                  <Text>
                    {endereco.bairro}, {endereco.cidade} - {endereco.estado}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    CEP: {endereco.cep}
                  </Text>
                </Box>
              ))}
            </VStack>
          ) : (
            <Text>Nenhum endereço cadastrado.</Text>
          )}
        </Box>
      )}
    </VStack>
  );
};
