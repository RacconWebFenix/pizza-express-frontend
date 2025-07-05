"use client";

import { useState } from "react";
import { Box, VStack, HStack } from "@chakra-ui/react";
import {
  PizzaInput,
  PizzaTextarea,
  PizzaButton,
  PizzaText,
  PizzaFileInput,
} from "../ui";
import type { Pizza } from "../../types";

interface CreatePizzaFormProps {
  onSuccess: (pizza: Pizza) => void;
  onCancel: () => void;
}

export function CreatePizzaForm({ onSuccess, onCancel }: CreatePizzaFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    ingredientes: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Preparar FormData para upload
      const formDataToSend = new FormData();
      formDataToSend.append("nome", formData.nome);
      formDataToSend.append("descricao", formData.descricao);
      formDataToSend.append("preco", formData.preco);
      formDataToSend.append("ingredientes", formData.ingredientes);

      if (image) {
        formDataToSend.append("imagem", image);
      }

      // Buscar token do cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pizzas`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar pizza");
      }

      const newPizza = await response.json();
      onSuccess(newPizza);

      // Reset form
      setFormData({
        nome: "",
        descricao: "",
        preco: "",
        ingredientes: "",
      });
      setImage(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="full" maxW="600px" mx="auto">
      <VStack gap={6} align="stretch">
        <PizzaText variant="heading" fontSize="2xl" textAlign="center">
          Criar Nova Pizza
        </PizzaText>

        {error && (
          <Box
            p={4}
            bg="red.50"
            border="1px solid"
            borderColor="red.200"
            borderRadius="md"
          >
            <PizzaText variant="danger">{error}</PizzaText>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <VStack gap={4} align="stretch">
            <Box>
              <PizzaText variant="caption" fontWeight="medium" mb={2}>
                Nome da Pizza *
              </PizzaText>
              <PizzaInput
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Ex: Margherita"
                required
              />
            </Box>

            <Box>
              <PizzaText variant="caption" fontWeight="medium" mb={2}>
                Descrição *
              </PizzaText>
              <PizzaTextarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                placeholder="Descrição da pizza..."
                rows={3}
                required
              />
            </Box>

            <Box>
              <PizzaText variant="caption" fontWeight="medium" mb={2}>
                Preço (R$) *
              </PizzaText>
              <PizzaInput
                name="preco"
                type="number"
                step="0.01"
                value={formData.preco}
                onChange={handleInputChange}
                placeholder="Ex: 35.90"
                required
              />
            </Box>

            <Box>
              <PizzaText variant="caption" fontWeight="medium" mb={2}>
                Ingredientes *
              </PizzaText>
              <PizzaTextarea
                name="ingredientes"
                value={formData.ingredientes}
                onChange={handleInputChange}
                placeholder="Ex: Molho de tomate, mussarela, manjericão..."
                rows={2}
                required
              />
            </Box>

            <Box>
              <PizzaFileInput
                label="Imagem da Pizza"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Box>

            <HStack gap={4} pt={4}>
              <PizzaButton
                type="submit"
                variant="primary"
                loading={isLoading}
                disabled={isLoading}
                flex={1}
              >
                {isLoading ? "Criando..." : "Criar Pizza"}
              </PizzaButton>
              <PizzaButton
                type="button"
                variant="secondary"
                onClick={onCancel}
                flex={1}
              >
                Cancelar
              </PizzaButton>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}
