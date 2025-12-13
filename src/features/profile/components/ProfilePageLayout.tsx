"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Avatar,
  Grid,
  GridItem,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { updateBasicProfile } from "../services/profileService";
import { createEndereco, updateEndereco } from "../services/enderecoService";
import { PizzaLoading, PizzaButton } from "@/components/ui";
import { EditProfileModal } from "./EditProfileModal";
import { EnderecoModal } from "./EnderecoModal";
import { EnderecoCard } from "./EnderecoCard";
import {
  FaEdit,
  FaPlus,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import type { User } from "@/types/users";
import type { Endereco } from "@/types/endereco";

/**
 * Componente visual principal para a página de perfil.
 * Ele usa o hook 'useProfile' para buscar e exibir os dados.
 */
export const ProfilePageLayout = () => {
  const { user, isLoading, error, refetch } = useProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEnderecoModalOpen, setIsEnderecoModalOpen] = useState(false);
  const [selectedEndereco, setSelectedEndereco] = useState<
    Endereco | undefined
  >(undefined);

  const handleSaveProfile = async (userData: Partial<User>) => {
    if (!user?.id) throw new Error("ID do usuário não encontrado");

    try {
      await updateBasicProfile(user.id, {
        nome: userData.nome || "",
        email: userData.email || "",
        telefone: userData.telefone || "",
      });
      // Refresh profile data after successful update
      await refetch();
    } catch (err) {
      throw err; // Re-throw to be handled by the modal
    }
  };

  const handleEditEndereco = (endereco: Endereco) => {
    setSelectedEndereco(endereco);
    setIsEnderecoModalOpen(true);
  };

  const handleDeleteEndereco = async (enderecoId: number) => {
    if (confirm("Tem certeza que deseja excluir este endereço?")) {
      // TODO: Implementar quando backend tiver rota DELETE /enderecos/:id
      console.log("Delete endereco:", enderecoId);
    }
  };

  const handleSetPrincipal = async (endereco: Endereco) => {
    // TODO: Implementar quando backend tiver rota PATCH /enderecos/:id
    console.log("Set principal endereco:", endereco.id);
  };

  const handleAddEndereco = () => {
    setSelectedEndereco(undefined);
    setIsEnderecoModalOpen(true);
  };

  const closeEnderecoModal = () => {
    setIsEnderecoModalOpen(false);
    setSelectedEndereco(undefined);
  };

  const handleSaveEndereco = async (data: {
    cep: string;
    tipo: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento?: string;
    principal: boolean;
  }) => {
    try {
      if (selectedEndereco) {
        // Editando endereço existente
        await updateEndereco(selectedEndereco.id, data);
      } else {
        // Criando novo endereço
        await createEndereco(data);
      }
      // Recarregar dados do perfil para refletir as mudanças
      await refetch();
      closeEnderecoModal();
    } catch (err) {
      console.error("Erro ao salvar endereço:", err);
      // TODO: Mostrar toast de erro para o usuário
    }
  };

  if (isLoading) {
    return <PizzaLoading message="Carregando seu perfil..." />;
  }

  if (error) {
    return (
      <Flex justify="center" align="center" h="100%" minH="400px">
        <Box textAlign="center" p={8}>
          <Text color="red.400" fontSize="lg" mb={4}>
            Erro ao carregar o perfil
          </Text>
          <Text color="gray.400">{error}</Text>
        </Box>
      </Flex>
    );
  }

  if (!user) {
    return (
      <Flex justify="center" align="center" h="100%" minH="400px">
        <Text color="gray.400">Usuário não encontrado</Text>
      </Flex>
    );
  }

  return (
    <Box w="full" maxW="6xl" mx="auto">
      {/* Header da página */}
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="2xl" color="white" fontFamily="heading">
          Meu Perfil
        </Heading>
        <PizzaButton variant="outline" onClick={() => setIsEditModalOpen(true)}>
          <HStack gap={2}>
            <FaEdit />
            <Text>Editar Perfil</Text>
          </HStack>
        </PizzaButton>
      </Flex>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} gap={8}>
        {/* Card do Perfil */}
        <GridItem>
          <Box
            bg="gray.800"
            borderColor="gray.700"
            borderWidth="1px"
            borderRadius="lg"
            p={6}
          >
            <VStack align="center" gap={4}>
              <Avatar.Root size="2xl">
                <Avatar.Image src={user.avatar || null} alt={user.nome} />
                <Avatar.Fallback
                  bg="brand.primary"
                  color="white"
                  fontSize="2xl"
                  fontWeight="bold"
                >
                  {user.nome.charAt(0).toUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>

              <VStack align="center" gap={2}>
                <Heading size="lg" color="white" textAlign="center">
                  {user.nome}
                </Heading>
                <Badge colorScheme="green" variant="solid">
                  Cliente Ativo
                </Badge>
              </VStack>

              <VStack align="stretch" gap={3} w="full" mt={4}>
                <HStack gap={3} color="gray.300">
                  <FaEnvelope />
                  <Text fontSize="sm">{user.email}</Text>
                </HStack>

                {user.telefone && (
                  <HStack gap={3} color="gray.300">
                    <FaPhone />
                    <Text fontSize="sm">{user.telefone}</Text>
                  </HStack>
                )}
              </VStack>
            </VStack>
          </Box>
        </GridItem>

        {/* Card dos Endereços */}
        <GridItem>
          <Box
            bg="gray.800"
            borderColor="gray.700"
            borderWidth="1px"
            borderRadius="lg"
          >
            {/* Header do Card */}
            <Box p={6} borderBottomWidth="1px" borderBottomColor="gray.700">
              <Flex justify="space-between" align="center">
                <Heading size="lg" color="white">
                  Meus Endereços
                </Heading>
                <PizzaButton
                  variant="outline"
                  size="sm"
                  onClick={handleAddEndereco}
                >
                  <HStack gap={2}>
                    <FaPlus />
                    <Text>Adicionar</Text>
                  </HStack>
                </PizzaButton>
              </Flex>
            </Box>

            {/* Body do Card */}
            <Box p={6}>
              {user.enderecos && user.enderecos.length > 0 ? (
                <VStack align="stretch" gap={4}>
                  {user.enderecos.map((endereco: Endereco) => (
                    <EnderecoCard
                      key={endereco.id}
                      endereco={endereco}
                      onEdit={() => handleEditEndereco(endereco)}
                      onDelete={() => handleDeleteEndereco(endereco.id)}
                      onSetPrincipal={() => handleSetPrincipal(endereco)}
                    />
                  ))}
                </VStack>
              ) : (
                <Box textAlign="center" py={8}>
                  <Box mb={4}>
                    <FaMapMarkerAlt size={48} color="#4A5568" />
                  </Box>
                  <Text color="gray.400" mb={6}>
                    Nenhum endereço cadastrado
                  </Text>
                  <PizzaButton onClick={handleAddEndereco}>
                    <HStack gap={2}>
                      <FaPlus />
                      <Text>Adicionar Primeiro Endereço</Text>
                    </HStack>
                  </PizzaButton>
                </Box>
              )}
            </Box>
          </Box>
        </GridItem>
      </Grid>

      {/* Modal de Edição de Perfil */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />

      {/* Modal de Endereço */}
      <EnderecoModal
        isOpen={isEnderecoModalOpen}
        onClose={closeEnderecoModal}
        endereco={selectedEndereco}
        onSave={handleSaveEndereco}
      />
    </Box>
  );
};
