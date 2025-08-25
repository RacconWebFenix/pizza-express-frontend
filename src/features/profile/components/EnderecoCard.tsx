"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import type { Endereco } from "@/types/endereco";

interface EnderecoCardProps {
  endereco: Endereco;
  onEdit: () => void;
  onDelete: () => void;
  onSetPrincipal?: () => void;
}

export const EnderecoCard = ({
  endereco,
  onEdit,
  onDelete,
  onSetPrincipal,
}: EnderecoCardProps) => {
  return (
    <Box
      bg="gray.800"
      borderColor="gray.700"
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      position="relative"
      _hover={{ borderColor: "gray.600" }}
      transition="all 0.2s"
    >
      {/* Header com tipo e principal */}
      <Flex justify="space-between" align="center" mb={3}>
        <HStack gap={2}>
          <FaMapMarkerAlt color="#666" />
          <Text color="white" fontWeight="semibold" textTransform="capitalize">
            {endereco.tipo}
          </Text>
          {endereco.principal && (
            <Badge colorScheme="yellow" variant="solid" size="sm">
              <HStack gap={1}>
                <FaStar size={10} />
                <Text fontSize="xs">Principal</Text>
              </HStack>
            </Badge>
          )}
        </HStack>

        {/* Actions */}
        <HStack gap={1}>
          {!endereco.principal && onSetPrincipal && (
            <IconButton
              aria-label="Definir como principal"
              size="sm"
              variant="ghost"
              color="gray.400"
              _hover={{ color: "yellow.400" }}
              onClick={onSetPrincipal}
            >
              <FaStar />
            </IconButton>
          )}
          <IconButton
            aria-label="Editar endereço"
            size="sm"
            variant="ghost"
            color="gray.400"
            _hover={{ color: "blue.400" }}
            onClick={onEdit}
          >
            <FaEdit />
          </IconButton>
          <IconButton
            aria-label="Excluir endereço"
            size="sm"
            variant="ghost"
            color="gray.400"
            _hover={{ color: "red.400" }}
            onClick={onDelete}
          >
            <FaTrash />
          </IconButton>
        </HStack>
      </Flex>

      {/* Endereço completo */}
      <VStack align="start" gap={1}>
        <Text color="gray.300" fontSize="sm">
          {endereco.logradouro}, {endereco.numero}
          {endereco.complemento && ` - ${endereco.complemento}`}
        </Text>
        <Text color="gray.400" fontSize="sm">
          {endereco.bairro}, {endereco.cidade} - {endereco.estado}
        </Text>
        <Text color="gray.400" fontSize="sm">
          CEP: {endereco.cep}
        </Text>
      </VStack>
    </Box>
  );
};
