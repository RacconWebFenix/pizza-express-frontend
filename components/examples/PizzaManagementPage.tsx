/* 
  EXEMPLO DE USO - Componente para gerenciar pizzas com imagens
  
  Este arquivo demonstra como implementar uma página completa de gerenciamento
  de pizzas com funcionalidades de upload de imagem.
*/

"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  SimpleGrid,
  Text,
  Button,
  Flex,
  Icon,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { FaPizzaSlice, FaPlus, FaImage, FaEdit } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

import { usePizzas } from "@/hooks/usePizzas";
import { usePizzaActions } from "@/hooks/usePizzaActions";
import { CreatePizzaWithImageForm } from "@/components/examples/CreatePizzaWithImageForm";
import { UploadImageToPizza } from "@/components/examples/UploadImageToPizza";
import { formatCurrency } from "@/utils/format";
import type { Pizza } from "@/types";

const MotionBox = motion(Box);

export const PizzaManagementPage: React.FC = () => {
  const { pizzas, isLoading, error, refetch } = usePizzas();
  const { remove } = usePizzaActions();

  const [view, setView] = useState<"list" | "create" | "upload">("list");
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);

  const handleCreatePizza = () => {
    setView("create");
  };

  const handleUploadImage = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setView("upload");
  };

  const handlePizzaCreated = (pizza: Pizza) => {
    console.log("Pizza criada:", pizza);
    setView("list");
    refetch(); // Recarregar lista
  };

  const handleImageUploaded = (updatedPizza: Pizza) => {
    console.log("Imagem atualizada:", updatedPizza);
    setView("list");
    setSelectedPizza(null);
    refetch(); // Recarregar lista
  };

  const handleDeletePizza = async (pizzaId: string) => {
    if (window.confirm("Tem certeza que deseja deletar esta pizza?")) {
      try {
        await remove(pizzaId);
        refetch(); // Recarregar lista
      } catch (error) {
        console.error("Erro ao deletar pizza:", error);
      }
    }
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedPizza(null);
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={12}>
        <Spinner size="xl" color="brand.accent" />
        <Text mt={4} color="brand.medium">
          Carregando pizzas...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={12}>
        <Text color="red.500" fontSize="lg">
          Erro ao carregar pizzas: {error}
        </Text>
        <Button mt={4} onClick={() => refetch()}>
          Tentar Novamente
        </Button>
      </Box>
    );
  }

  return (
    <VStack gap={8} align="stretch" w="full">
      {/* Navegação */}
      <Flex justify="space-between" align="center">
        <Heading color="brand.primary" size="xl">
          <Flex align="center" gap={3}>
            <Icon as={FaPizzaSlice} color="brand.accent" />
            {view === "create" && "Criar Nova Pizza"}
            {view === "upload" && "Upload de Imagem"}
            {view === "list" && "Gerenciar Pizzas"}
          </Flex>
        </Heading>

        {view !== "list" && (
          <Button onClick={handleBackToList} variant="outline">
            ← Voltar para Lista
          </Button>
        )}
      </Flex>

      {/* Conteúdo baseado na view */}
      {view === "create" && (
        <Box maxW="800px" mx="auto">
          <CreatePizzaWithImageForm
            onSuccess={handlePizzaCreated}
            onCancel={handleBackToList}
          />
        </Box>
      )}

      {view === "upload" && selectedPizza && (
        <Box maxW="600px" mx="auto">
          <UploadImageToPizza
            pizza={selectedPizza}
            onSuccess={handleImageUploaded}
            onCancel={handleBackToList}
          />
        </Box>
      )}

      {view === "list" && (
        <>
          {/* Botão para criar nova pizza */}
          <Flex justify="center">
            <Button
              bg="brand.fresh"
              color="white"
              size="lg"
              borderRadius="xl"
              onClick={handleCreatePizza}
              _hover={{ bg: "brand.success" }}
            >
              <Icon as={FaPlus} mr={2} />
              Nova Pizza
            </Button>
          </Flex>

          {/* Lista de pizzas */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {pizzas.map((pizza, index) => (
              <MotionBox
                key={pizza.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Box
                  bg="white"
                  borderRadius="2xl"
                  boxShadow="md"
                  overflow="hidden"
                  border="1px"
                  borderColor="gray.100"
                  transition="all 0.3s"
                  _hover={{
                    borderColor: "brand.accent",
                    boxShadow: "xl",
                  }}
                >
                  {/* Imagem da pizza */}
                  <Box position="relative" h="200px" bg="gray.100">
                    {pizza.imagemUrl ? (
                      <Image
                        src={pizza.imagemUrl}
                        alt={pizza.nome}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Flex
                        align="center"
                        justify="center"
                        h="full"
                        direction="column"
                        color="gray.400"
                      >
                        <Icon as={FaPizzaSlice} boxSize={12} />
                        <Text mt={2} fontSize="sm">
                          Sem imagem
                        </Text>
                      </Flex>
                    )}

                    {/* Badge de status */}
                    <Badge
                      position="absolute"
                      top={3}
                      right={3}
                      colorScheme={pizza.disponivel ? "green" : "red"}
                    >
                      {pizza.disponivel ? "Disponível" : "Indisponível"}
                    </Badge>
                  </Box>

                  {/* Conteúdo */}
                  <Box p={6}>
                    <Heading size="md" color="brand.primary" mb={2}>
                      {pizza.nome}
                    </Heading>
                    <Text
                      color="brand.medium"
                      fontSize="sm"
                      mb={4}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {pizza.descricao}
                    </Text>
                    <Text
                      color="brand.fresh"
                      fontSize="xl"
                      fontWeight="bold"
                      mb={4}
                    >
                      {formatCurrency(pizza.preco)}
                    </Text>

                    {/* Ações */}
                    <Flex gap={2} wrap="wrap">
                      <Button
                        size="sm"
                        bg="brand.accent"
                        color="white"
                        onClick={() => handleUploadImage(pizza)}
                        _hover={{ bg: "brand.primary" }}
                      >
                        <Icon as={FaImage} mr={1} />
                        {pizza.imagemUrl ? "Trocar" : "Adicionar"} Imagem
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        borderColor="brand.medium"
                        color="brand.medium"
                        _hover={{ bg: "brand.light" }}
                      >
                        <Icon as={FaEdit} mr={1} />
                        Editar
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        borderColor="red.400"
                        color="red.500"
                        onClick={() => handleDeletePizza(pizza.id)}
                        _hover={{ bg: "red.50" }}
                      >
                        Deletar
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* Mensagem quando não há pizzas */}
          {pizzas.length === 0 && (
            <Box textAlign="center" py={12}>
              <Icon as={FaPizzaSlice} boxSize={16} color="gray.300" />
              <Text color="gray.500" fontSize="lg" mt={4}>
                Nenhuma pizza cadastrada ainda
              </Text>
              <Button
                mt={4}
                bg="brand.fresh"
                color="white"
                onClick={handleCreatePizza}
                _hover={{ bg: "brand.success" }}
              >
                Criar Primeira Pizza
              </Button>
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

/* 
  INSTRUÇÕES DE USO:

  1. Salve este componente em: /components/pages/PizzaManagementPage.tsx
  
  2. Use na sua rota /cardapio/page.tsx:
     
     import { PizzaManagementPage } from "@/components/pages/PizzaManagementPage";
     
     export default function CardapioPage() {
       return <PizzaManagementPage />;
     }

  3. Ou integre diretamente no dashboard substituindo a navegação atual.

  FUNCIONALIDADES INCLUÍDAS:
  ✅ Listar todas as pizzas com imagens
  ✅ Criar nova pizza com imagem
  ✅ Upload/troca de imagem para pizzas existentes  
  ✅ Deletar pizzas
  ✅ Interface responsiva e moderna
  ✅ Estados de loading e erro
  ✅ Navegação entre diferentes views
*/
