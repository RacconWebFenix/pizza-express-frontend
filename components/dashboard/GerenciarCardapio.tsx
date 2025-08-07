"use client";
import { useState } from "react";
import { usePizzas } from "../../hooks/usePizzas";
import { deletePizza } from "../../services/pizza-service";
import { uploadPizzaImage } from "../../services/pizza-service";
import { PizzaFormContainer } from "./PizzaFormContainer";
import { Pizza } from "../../types";
import { PizzaButton, PizzaLoading } from "../ui";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  VStack,
  HStack,
  AspectRatio,
  Text,
} from "@chakra-ui/react";
import { formatCurrency } from "@/utils/format";
import { TbArrowBack } from "react-icons/tb";

const MotionBox = motion(Box);

interface GerenciarCardapioProps {
  onNavigateBack: () => void; // Função para voltar ao dashboard principal
}

export const GerenciarCardapio = ({
  onNavigateBack,
}: GerenciarCardapioProps) => {
  const { pizzas, setPizzas, isLoading, error, refetch } = usePizzas();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pizzaToEdit, setPizzaToEdit] = useState<Pizza | null>(null);
  const [removingPizzaId, setRemovingPizzaId] = useState<string | null>(null);
  const [isRefetching, setIsRefetching] = useState(false); // Loading para refetch
  // Estado para upload isolado de imagem
  const [imageModalPizza, setImageModalPizza] = useState<Pizza | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  const handleOpenCreateModal = () => {
    setPizzaToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (pizza: Pizza) => {
    setPizzaToEdit(pizza);
    setIsFormOpen(true);
  };

  const handleFormSuccess = async (updatedOrCreatedPizza: Pizza) => {
    // Mostra loading durante o refetch
    setIsRefetching(true);

    try {
      // Faz refetch para garantir que temos os dados mais atualizados do servidor
      await refetch();
    } catch (error) {
      console.error("Erro ao atualizar lista de pizzas:", error);
      // Fallback: atualiza manualmente se o refetch falhar
      setPizzas((prev: Pizza[]) => {
        const index: number = prev.findIndex(
          (p: Pizza) => p.id === updatedOrCreatedPizza.id
        );
        if (index > -1) {
          // Atualização: substitui a pizza existente
          const newPizzas: Pizza[] = [...prev];
          newPizzas[index] = { ...updatedOrCreatedPizza };
          return newPizzas;
        }
        // Criação: adiciona nova pizza
        return [updatedOrCreatedPizza, ...prev];
      });
    } finally {
      setIsRefetching(false);
    }
  };
  // setRemovingPizzaId("3"); // Inicia loading

  // Função para remover pizza
  const handleRemovePizza = async (pizza: Pizza) => {
    setRemovingPizzaId(pizza.id); // Inicia loading
    try {
      await deletePizza(pizza.id);
      setPizzas((prev: Pizza[]) => prev.filter((p) => p.id !== pizza.id));
    } catch {
      alert("Erro ao remover pizza no servidor.");
    } finally {
      setRemovingPizzaId(null); // Finaliza loading
    }
  };

  // Função para upload isolado de imagem
  const handleUploadImage = async () => {
    if (!imageModalPizza || !imageFile) return;
    setImageUploadLoading(true);
    setImageUploadError(null);
    try {
      await uploadPizzaImage(imageModalPizza.id, imageFile);

      // Fecha o modal primeiro
      setImageModalPizza(null);
      setImageFile(null);

      // Mostra loading e faz refetch para garantir dados atualizados
      setIsRefetching(true);
      await refetch();
    } catch (error) {
      setImageUploadError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao atualizar imagem."
      );
    } finally {
      setImageUploadLoading(false);
      setIsRefetching(false);
    }
  };

  if (isLoading || isRefetching)
    return (
      <PizzaLoading
        message={
          isRefetching ? "Atualizando lista..." : "Carregando cardápio..."
        }
      />
    );
  if (error)
    return (
      <Text color="red.500" textAlign="center">
        Erro ao carregar pizzas: {error}
      </Text>
    );

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Flex align="center">
          <PizzaButton onClick={onNavigateBack} mr={4}>
            <Icon as={TbArrowBack} boxSize={6} />
            <Heading as="h1" size="xl">
              Voltar
            </Heading>
          </PizzaButton>
        </Flex>
        <PizzaButton variant="solid" onClick={handleOpenCreateModal}>
          <Icon as={PlusCircle} boxSize={6} />
          Adicionar Pizza
        </PizzaButton>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {pizzas.map((pizza, index) => (
          <MotionBox
            key={pizza.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <Box
              bg="gray.900"
              color="white"
              borderRadius="xl"
              boxShadow="lg"
              overflow="hidden"
              border="1px"
              borderColor="gray.700"
              transition="all 0.3s"
              _hover={{
                borderColor: "orange.500",
                boxShadow: "outline",
              }}
              height="100%" // Para manter altura consistente
              display="flex"
              flexDirection="column"
            >
              {/* Imagem da Pizza - Mesmo estilo do cardápio */}
              <AspectRatio ratio={4 / 3}>
                <Box position="relative" w="full" h="full">
                  <Image
                    key={`${pizza.id}-${pizza.imagemUrl}`} // Force re-render when image changes
                    src={pizza.imagemUrl || "/pizza.png"}
                    alt={`Imagem da pizza ${pizza.nome}`}
                    width="100%"
                    height="100%"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />

                  {/* Overlay com preço - Mesmo estilo do cardápio */}
                  <Box
                    position="absolute"
                    top={3}
                    right={3}
                    bg="orange.500"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="lg"
                    fontWeight="bold"
                    boxShadow="md"
                  >
                    {formatCurrency(pizza.preco)}
                  </Box>
                </Box>
              </AspectRatio>

              {/* Header da Pizza - Mesmo estilo do cardápio */}
              <Box
                bg="blackAlpha.400"
                p={4}
                borderBottom="1px"
                borderColor="gray.700"
              >
                <Heading size="lg" color="whiteAlpha.900" textAlign="center">
                  {pizza.nome}
                </Heading>
              </Box>

              {/* Conteúdo - Adaptado para gerenciamento */}
              <VStack p={6} gap={4} align="stretch" flex="1">
                <Text
                  color="whiteAlpha.700"
                  fontSize="md"
                  textAlign="center"
                  minH="60px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  lineHeight="1.5"
                >
                  {pizza.descricao}
                </Text>

                {/* Botões de gerenciamento - Substitui o botão "Pedir Agora" */}
                <HStack w="full" gap={2}>
                  <Button
                    colorScheme="orange"
                    size="lg"
                    onClick={() => handleOpenEditModal(pizza)}
                    flex="1"
                    _hover={{ bg: "orange.600" }}
                    transition="all 0.2s"
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    colorScheme="red"
                    size="lg"
                    onClick={() => handleRemovePizza(pizza)}
                    loading={removingPizzaId === pizza.id}
                    flex="1"
                    _hover={{ bg: "red.600" }}
                    transition="all 0.2s"
                  >
                    🗑️ Remover
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </MotionBox>
        ))}
      </Grid>

      {/* Modal simples para upload isolado de imagem */}
      {imageModalPizza && (
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="blackAlpha.600"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box bg="white" p={8} borderRadius="lg" minW="320px" boxShadow="xl">
            <Heading size="md" mb={4}>
              Atualizar imagem de {imageModalPizza.nome}
            </Heading>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                } else {
                  setImageFile(null);
                }
              }}
              disabled={imageUploadLoading}
            />
            {imageUploadError && (
              <Text color="red.500" mt={2}>
                {imageUploadError}
              </Text>
            )}
            <Flex mt={4} gap={2}>
              <PizzaButton
                variant="outline"
                onClick={() => {
                  setImageModalPizza(null);
                  setImageFile(null);
                  setImageUploadError(null);
                }}
                disabled={imageUploadLoading}
              >
                Cancelar
              </PizzaButton>
              <PizzaButton
                variant="solid"
                onClick={handleUploadImage}
                loading={imageUploadLoading}
                disabled={!imageFile}
              >
                Salvar imagem
              </PizzaButton>
            </Flex>
          </Box>
        </Box>
      )}

      {isFormOpen && (
        <PizzaFormContainer
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          pizzaToEdit={pizzaToEdit}
          onSuccess={handleFormSuccess}
        />
      )}
    </Box>
  );
};
