"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaSave, FaMapMarkerAlt } from "react-icons/fa";
import { AppModal, PizzaButton } from "@/components/ui";
import type { Endereco } from "@/types/endereco";

interface EnderecoModalProps {
  isOpen: boolean;
  onClose: () => void;
  endereco?: Endereco;
  onSave: (data: {
    cep: string;
    tipo: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento?: string;
    principal: boolean;
  }) => Promise<void>;
}

export const EnderecoModal = ({
  isOpen,
  onClose,
  endereco,
  onSave,
}: EnderecoModalProps) => {
  const [formData, setFormData] = useState({
    cep: "",
    tipo: "residencial",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
    principal: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(endereco);

  useEffect(() => {
    if (endereco) {
      setFormData({
        cep: endereco.cep || "",
        tipo: endereco.tipo || "residencial",
        logradouro: endereco.logradouro || "",
        numero: endereco.numero || "",
        bairro: endereco.bairro || "",
        cidade: endereco.cidade || "",
        estado: endereco.estado || "",
        complemento: endereco.complemento || "",
        principal: endereco.principal || false,
      });
    } else {
      setFormData({
        cep: "",
        tipo: "residencial",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        complemento: "",
        principal: false,
      });
    }
  }, [endereco, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isEditing) {
        await onSave(formData);
      } else {
        await onSave(formData);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar endereço");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Editar Endereço" : "Novo Endereço"}
    >
      <Box p={6}>
        <form onSubmit={handleSubmit}>
          <VStack gap={4} align="stretch">
            {/* Tipo e CEP */}
            <Grid templateColumns="1fr 1fr" gap={4}>
              <GridItem>
                <HStack gap={2} mb={2}>
                  <FaMapMarkerAlt color="#666" />
                  <Text color="gray.300" fontSize="sm">
                    Tipo
                  </Text>
                </HStack>
                <select
                  value={formData.tipo}
                  onChange={(e) => handleChange("tipo", e.target.value)}
                  style={{
                    backgroundColor: "#2D3748",
                    borderColor: "#4A5568",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #4A5568",
                    width: "100%",
                  }}
                >
                  <option
                    value="residencial"
                    style={{ backgroundColor: "#2D3748", color: "white" }}
                  >
                    Residencial
                  </option>
                  <option
                    value="trabalho"
                    style={{ backgroundColor: "#2D3748", color: "white" }}
                  >
                    Trabalho
                  </option>
                  <option
                    value="comercial"
                    style={{ backgroundColor: "#2D3748", color: "white" }}
                  >
                    Comercial
                  </option>
                  <option
                    value="outro"
                    style={{ backgroundColor: "#2D3748", color: "white" }}
                  >
                    Outro
                  </option>
                </select>
              </GridItem>

              <GridItem>
                <Text color="gray.300" fontSize="sm" mb={2}>
                  CEP
                </Text>
                <Input
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={(e) => handleChange("cep", e.target.value)}
                  required
                  bg="gray.700"
                  borderColor="gray.600"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                  _focus={{
                    borderColor: "brand.primary",
                    boxShadow: "0 0 0 1px #D92B2B",
                  }}
                />
              </GridItem>
            </Grid>

            {/* Logradouro e Número */}
            <Grid templateColumns="2fr 1fr" gap={4}>
              <GridItem>
                <Text color="gray.300" fontSize="sm" mb={2}>
                  Logradouro
                </Text>
                <Input
                  placeholder="Rua, Avenida, etc."
                  value={formData.logradouro}
                  onChange={(e) => handleChange("logradouro", e.target.value)}
                  required
                  bg="gray.700"
                  borderColor="gray.600"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                  _focus={{
                    borderColor: "brand.primary",
                    boxShadow: "0 0 0 1px #D92B2B",
                  }}
                />
              </GridItem>

              <GridItem>
                <Text color="gray.300" fontSize="sm" mb={2}>
                  Número
                </Text>
                <Input
                  placeholder="123"
                  value={formData.numero}
                  onChange={(e) => handleChange("numero", e.target.value)}
                  required
                  bg="gray.700"
                  borderColor="gray.600"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                  _focus={{
                    borderColor: "brand.primary",
                    boxShadow: "0 0 0 1px #D92B2B",
                  }}
                />
              </GridItem>
            </Grid>

            {/* Bairro e Complemento */}
            <Grid templateColumns="1fr 1fr" gap={4}>
              <GridItem>
                <Text color="gray.300" fontSize="sm" mb={2}>
                  Bairro
                </Text>
                <Input
                  placeholder="Nome do bairro"
                  value={formData.bairro}
                  onChange={(e) => handleChange("bairro", e.target.value)}
                  required
                  bg="gray.700"
                  borderColor="gray.600"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                  _focus={{
                    borderColor: "brand.primary",
                    boxShadow: "0 0 0 1px #D92B2B",
                  }}
                />
              </GridItem>

              <GridItem>
                <Text color="gray.300" fontSize="sm" mb={2}>
                  Complemento
                </Text>
                <Input
                  placeholder="Apto, sala, etc. (opcional)"
                  value={formData.complemento}
                  onChange={(e) => handleChange("complemento", e.target.value)}
                  bg="gray.700"
                  borderColor="gray.600"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                  _focus={{
                    borderColor: "brand.primary",
                    boxShadow: "0 0 0 1px #D92B2B",
                  }}
                />
              </GridItem>
            </Grid>

            {/* Cidade e Estado */}
            <Grid templateColumns="2fr 1fr" gap={4}>
              <GridItem>
                <Text color="gray.300" fontSize="sm" mb={2}>
                  Cidade
                </Text>
                <Input
                  placeholder="Nome da cidade"
                  value={formData.cidade}
                  onChange={(e) => handleChange("cidade", e.target.value)}
                  required
                  bg="gray.700"
                  borderColor="gray.600"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                  _focus={{
                    borderColor: "brand.primary",
                    boxShadow: "0 0 0 1px #D92B2B",
                  }}
                />
              </GridItem>

              <GridItem>
                <Text color="gray.300" fontSize="sm" mb={2}>
                  Estado
                </Text>
                <Input
                  placeholder="SP"
                  value={formData.estado}
                  onChange={(e) => handleChange("estado", e.target.value)}
                  required
                  maxLength={2}
                  bg="gray.700"
                  borderColor="gray.600"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                  _focus={{
                    borderColor: "brand.primary",
                    boxShadow: "0 0 0 1px #D92B2B",
                  }}
                />
              </GridItem>
            </Grid>

            {/* Principal */}
            <Box>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#A0AEC0",
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.principal}
                  onChange={(e) => handleChange("principal", e.target.checked)}
                  style={{
                    accentColor: "#D92B2B",
                    width: "16px",
                    height: "16px",
                  }}
                />
                <Text color="gray.300" fontSize="sm">
                  Definir como endereço principal
                </Text>
              </label>
            </Box>

            {/* Error Message */}
            {error && (
              <Box
                bg="red.900"
                border="1px solid"
                borderColor="red.400"
                borderRadius="md"
                p={3}
              >
                <Text color="red.400" fontSize="sm">
                  {error}
                </Text>
              </Box>
            )}

            {/* Actions */}
            <HStack gap={3} justify="end" mt={6}>
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={isLoading}
                color="gray.400"
                _hover={{ color: "white", bg: "gray.700" }}
              >
                Cancelar
              </Button>
              <PizzaButton
                type="submit"
                icon={FaSave}
                loading={isLoading}
                variant="solid"
                colorScheme="red"
              >
                {isLoading
                  ? "Salvando..."
                  : isEditing
                  ? "Atualizar"
                  : "Adicionar"}
              </PizzaButton>
            </HStack>
          </VStack>
        </form>
      </Box>
    </AppModal>
  );
};
