"use client";
import { useState } from "react";
import { usePizzas } from "../../hooks/usePizzas";
import { PizzaFormContainer } from "./PizzaFormContainer";
import { Pizza } from "../../types";
import { PizzaButton, PizzaCard, PizzaLoading, PizzaText } from "../ui";
import { PlusCircle, PlusCircleIcon } from "lucide-react";
import { Box, Flex, Grid, Heading, Image, VStack } from "@chakra-ui/react";
import { formatCurrency } from "@/utils/format";

interface GerenciarCardapioProps {
  onNavigateBack: () => void; // Função para voltar ao dashboard principal
}

export const GerenciarCardapio = ({
  onNavigateBack,
}: GerenciarCardapioProps) => {
  const { pizzas, setPizzas, isLoading, error } = usePizzas();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pizzaToEdit, setPizzaToEdit] = useState<Pizza | null>(null);

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
          <PizzaButton
            aria-label="Voltar"
            leftIcon={<PlusCircleIcon size="16px" />}
            onClick={onNavigateBack}
            mr={4}
            variant="ghost"
          />
          <Heading as="h1" size="xl">
            Gerenciar Cardápio
          </Heading>
        </Flex>
        <PizzaButton
          onClick={handleOpenCreateModal}
          leftIcon={<PlusCircle size="16px" />}
        >
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
          // CORREÇÃO AQUI: Não passamos mais a prop 'pizza'.
          // Em vez disso, construímos o conteúdo DENTRO do PizzaCard.
          <PizzaCard key={pizza.id}>
            <VStack spaceX={4} spaceY={4} align="stretch">
              {/* Imagem da Pizza */}
              <Image
                src={pizza.imagemUrl || "/pizza.png"} // Usa a URL da API ou um fallback
                alt={`Imagem da pizza ${pizza.nome}`}
                borderRadius="md"
                height="200px"
                objectFit="cover" // Garante que a imagem preencha o espaço
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

              {/* Botão de Ação */}
              <Flex justify="flex-end">
                <PizzaButton
                  variant="outline"
                  onClick={() => handleOpenEditModal(pizza)}
                >
                  Editar
                </PizzaButton>
              </Flex>
            </VStack>
          </PizzaCard>
        ))}
      </Grid>

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
