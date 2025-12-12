"use client";

import React from 'react';
import {
  Box,
  Text,
  VStack,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { FaChair, FaClock } from 'react-icons/fa';
import { MesaStatus } from '@/types/mesa';

interface MesaCardProps {
  mesa: {
    id: string;
    number: number;
    status: MesaStatus;
    sessaoAtiva?: {
      id: string;
      criadoEm: string;
      pedidos: any[];
      total: number;
    };
  };
  onClick: () => void;
}

export const MesaCard: React.FC<MesaCardProps> = ({ mesa, onClick }) => {
  const getStatusConfig = (status: MesaStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          bg: 'green.500',
          borderColor: 'green.300',
          color: 'white',
          label: 'Livre',
        };
      case 'OCCUPIED':
        return {
          bg: 'red.500',
          borderColor: 'red.300',
          color: 'white',
          label: 'Ocupada',
        };
      case 'RESERVED':
        return {
          bg: 'yellow.500',
          borderColor: 'yellow.300',
          color: 'white',
          label: 'Reservada',
        };
      default:
        return {
          bg: 'gray.500',
          borderColor: 'gray.300',
          color: 'white',
          label: 'Desconhecido',
        };
    }
  };

  const statusConfig = getStatusConfig(mesa.status);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) {
      return `${diffMins}min`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours}h ${diffMins % 60}min`;
    }
  };

  return (
    <Box
      as="button"
      onClick={onClick}
      w="full"
      aspectRatio="1"
      bg={statusConfig.bg}
      borderRadius="lg"
      border="2px solid"
      borderColor={statusConfig.borderColor}
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      transition="all 0.2s"
      _hover={{
        transform: 'scale(1.05)',
        shadow: 'lg',
      }}
      _active={{
        transform: 'scale(0.95)',
      }}
    >
      <VStack gap={2} align="center">
        {/* Ícone da cadeira */}
        <Icon as={FaChair} size="24px" color={statusConfig.color} />

        {/* Número da mesa */}
        <Text
          fontSize="xl"
          fontWeight="bold"
          color={statusConfig.color}
        >
          {mesa.number}
        </Text>

        {/* Status */}
        <Badge
          bg="whiteAlpha.900"
          color={statusConfig.bg}
          fontSize="xs"
          px={2}
          py={1}
          borderRadius="full"
        >
          {statusConfig.label}
        </Badge>

        {/* Tempo de ocupação (se ocupada) */}
        {mesa.status === 'OCCUPIED' && mesa.sessaoAtiva && (
          <HStack gap={1} align="center">
            <Icon as={FaClock} size="12px" color={statusConfig.color} />
            <Text fontSize="xs" color={statusConfig.color}>
              {formatTime(mesa.sessaoAtiva.criadoEm)}
            </Text>
          </HStack>
        )}

        {/* Número de pedidos (se ocupada) */}
        {mesa.status === 'OCCUPIED' && mesa.sessaoAtiva && (
          <Badge
            bg="whiteAlpha.800"
            color={statusConfig.bg}
            fontSize="xs"
            px={2}
            py={1}
            borderRadius="full"
          >
            {mesa.sessaoAtiva.pedidos.length} pedidos
          </Badge>
        )}
      </VStack>
    </Box>
  );
};