"use client";

import { Box, Text, VStack, HStack, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { FaSave, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { AppModal, PizzaButton } from "@/components/ui";
import type { User } from "@/types/users";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (userData: Partial<User>) => Promise<void>;
}

export const EditProfileModal = ({
  isOpen,
  onClose,
  user,
  onSave,
}: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    nome: user.nome || "",
    email: user.email || "",
    telefone: user.telefone || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AppModal isOpen={isOpen} onClose={onClose} title="Editar Perfil">
      <Box p={6}>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <VStack gap={4} align="stretch">
            {/* Nome */}
            <Box>
              <HStack gap={2} mb={2}>
                <FaUser color="#666" />
                <Text color="gray.300" fontSize="sm">
                  Nome Completo
                </Text>
              </HStack>
              <Input
                placeholder="Digite seu nome completo"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
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
            </Box>

            {/* Email */}
            <Box>
              <HStack gap={2} mb={2}>
                <FaEnvelope color="#666" />
                <Text color="gray.300" fontSize="sm">
                  E-mail
                </Text>
              </HStack>
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
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
            </Box>

            {/* Telefone */}
            <Box>
              <HStack gap={2} mb={2}>
                <FaPhone color="#666" />
                <Text color="gray.300" fontSize="sm">
                  Telefone
                </Text>
              </HStack>
              <Input
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
                _focus={{
                  borderColor: "brand.primary",
                  boxShadow: "0 0 0 1px #D92B2B",
                }}
              />
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
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </PizzaButton>
            </HStack>
          </VStack>
        </form>
      </Box>
    </AppModal>
  );
};
