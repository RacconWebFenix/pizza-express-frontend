"use client";
import { useState } from "react";
import { usePizzas } from "../../hooks/usePizzas";
import { deletePizza } from "../../services/pizza-service";
import { uploadPizzaImage } from "../../services/pizza-service";
import { PizzaFormContainer } from "./PizzaFormContainer";
import { Pizza } from "../../types";
import { PizzaButton, PizzaCard, PizzaLoading, PizzaText } from "../ui";
import { PlusCircle } from "lucide-react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  VStack,
} from "@chakra-ui/react";
import { formatCurrency } from "@/utils/format";
import { TbArrowBack } from "react-icons/tb";

interface GerenciarCardapioProps {
  onNavigateBack: () => void; // Função para voltar ao dashboard principal
}

export const GerenciarCardapio = ({
  onNavigateBack,
}: GerenciarCardapioProps) => {
  const { pizzas, setPizzas, isLoading, error } = usePizzas();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pizzaToEdit, setPizzaToEdit] = useState<Pizza | null>(null);
  const [removingPizzaId, setRemovingPizzaId] = useState<string | null>(null);
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

  const handleFormSuccess = (updatedOrCreatedPizza: Pizza) => {
    setPizzas((prev: Pizza[]) => {
      const index: number = prev.findIndex(
        (p: Pizza) => p.id === updatedOrCreatedPizza.id
      );
      if (index > -1) {
        const newPizzas: Pizza[] = [...prev];
        newPizzas[index] = updatedOrCreatedPizza;
        return newPizzas;
      }
      return [updatedOrCreatedPizza, ...prev];
    });
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
      const updatedPizza = await uploadPizzaImage(
        imageModalPizza.id,
        imageFile
      );
      setPizzas((prev) =>
        prev.map((p) => (p.id === updatedPizza.id ? updatedPizza : p))
      );
      setImageModalPizza(null);
      setImageFile(null);
    } catch (error) {
      setImageUploadError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao atualizar imagem."
      );
    } finally {
      setImageUploadLoading(false);
    }
  };

  if (isLoading) return <PizzaLoading message="Carregando cardápio..." />;
  if (error)
    return (
      <PizzaText variant="danger" textAlign="center">
        {error}
      </PizzaText>
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
        <PizzaButton
          variant="solid"
          onClick={handleOpenCreateModal}
        >
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
        {pizzas.map((pizza) => (
          <PizzaCard key={pizza.id}>
            <VStack spaceX={4} spaceY={4} align="stretch">
              {/* Imagem da Pizza */}
              <Image
                src={pizza.imagemUrl || "/pizza.png"}
                alt={`Imagem da pizza ${pizza.nome}`}
                borderRadius="md"
                height="200px"
                objectFit="cover"
              />
              {/* Informações da Pizza */}
              <VStack spaceX={1} align="stretch" flex="1">
                <Heading size="md">{pizza.nome}</Heading>
                <PizzaText fontSize="sm" color="gray.600">
                  {pizza.descricao}
                </PizzaText>
                <PizzaText
                  fontWeight="bold"
                  fontSize="lg"
                  color="brand.success"
                >
                  {formatCurrency(pizza.preco)}
                </PizzaText>
              </VStack>
              {/* Botões de Ação */}
              <Flex justify="space-around" gap={4}>
                <PizzaButton
                  variant="outline"
                  onClick={() => handleOpenEditModal(pizza)}
                  w="full"
                >
                  Editar
                </PizzaButton>
                <PizzaButton
                  variant="outline"
                  colorScheme="red"
                  onClick={() => handleRemovePizza(pizza)}
                  w="full"
                  loading={removingPizzaId === pizza.id}
                >
                  Remover
                </PizzaButton>
                <PizzaButton
                  variant="outline"
                  onClick={() => {
                    setImageModalPizza(pizza);
                    setImageFile(null);
                    setImageUploadError(null);
                  }}
                  w="full"
                >
                  Atualizar imagem
                </PizzaButton>
              </Flex>
            </VStack>
          </PizzaCard>
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
              <PizzaText variant="danger" mt={2}>
                {imageUploadError}
              </PizzaText>
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
