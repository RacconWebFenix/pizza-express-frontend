"use client";

import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { FaPlus, FaChair } from 'react-icons/fa';
import { PizzaButton } from '@/components/ui';
import { useMesas } from '../hooks/useMesas';
import { MesaCard } from './MesaCard';
import { SessaoDetalhesModal } from './SessaoDetalhesModal';
import { Mesa } from '@/types/mesa';

export const DashboardMesas: React.FC = () => {
  const { mesas, isLoading, error } = useMesas();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);

  const handleMesaClick = (mesa: Mesa) => {
    setSelectedMesa(mesa);
    onOpen();
  };

  const handleModalClose = () => {
    setSelectedMesa(null);
    onClose();
  };

  if (isLoading) {
    return <Text>Carregando mesas...</Text>;
  }

  if (error) {
    return (
      <Box p={4} bg="red.50" borderRadius="md" border="1px solid" borderColor="red.200">
        <Text color="red.600">{error}</Text>
      </Box>
    );
  }

  // Estatísticas
  const mesasDisponiveis = mesas.filter(m => m.status === 'AVAILABLE').length;
  const mesasOcupadas = mesas.filter(m => m.status === 'OCCUPIED').length;
  const mesasReservadas = mesas.filter(m => m.status === 'RESERVED').length;

  return (
    <VStack gap={6} align="stretch">
      {/* Header com Estatísticas */}
      <Box>
        <HStack justify="space-between" align="center" mb={4}>
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              Controle de Mesas
            </Text>
            <Text color="gray.600">
              Gerencie as mesas e sessões do restaurante
            </Text>
          </Box>
        </HStack>

        {/* Cards de Estatísticas */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
          <Box p={4} bg="green.50" borderRadius="md" border="1px solid" borderColor="green.200">
            <HStack gap={3}>
              <Box p={2} bg="green.500" borderRadius="md">
                <FaChair color="white" size={20} />
              </Box>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                  {mesasDisponiveis}
                </Text>
                <Text fontSize="sm" color="green.600">
                  Mesas Disponíveis
                </Text>
              </Box>
            </HStack>
          </Box>

          <Box p={4} bg="red.50" borderRadius="md" border="1px solid" borderColor="red.200">
            <HStack gap={3}>
              <Box p={2} bg="red.500" borderRadius="md">
                <FaChair color="white" size={20} />
              </Box>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="red.600">
                  {mesasOcupadas}
                </Text>
                <Text fontSize="sm" color="red.600">
                  Mesas Ocupadas
                </Text>
              </Box>
            </HStack>
          </Box>

          <Box p={4} bg="yellow.50" borderRadius="md" border="1px solid" borderColor="yellow.200">
            <HStack gap={3}>
              <Box p={2} bg="yellow.500" borderRadius="md">
                <FaChair color="white" size={20} />
              </Box>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="yellow.600">
                  {mesasReservadas}
                </Text>
                <Text fontSize="sm" color="yellow.600">
                  Mesas Reservadas
                </Text>
              </Box>
            </HStack>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Grid de Mesas */}
      {mesas.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" mb={4}>
            Nenhuma mesa cadastrada ainda.
          </Text>
          <Text color="gray.400" fontSize="sm">
            Entre em contato com o administrador para cadastrar mesas.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6, xl: 8 }} gap={4}>
          {mesas.map((mesa) => (
            <MesaCard
              key={mesa.id}
              mesa={mesa}
              onClick={() => handleMesaClick(mesa)}
            />
          ))}
        </SimpleGrid>
      )}

      {/* Modal de Detalhes da Sessão */}
      <SessaoDetalhesModal
        isOpen={isOpen}
        onClose={handleModalClose}
        mesa={selectedMesa}
      />
    </VStack>
  );
};