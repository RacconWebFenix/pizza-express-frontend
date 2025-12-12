"use client";

import React from 'react';
import { Box } from '@chakra-ui/react';
import { FaChair, FaClock } from 'react-icons/fa';
import { MesaStatus, Mesa } from '@/types/mesa';

interface MesaCardProps {
  mesa: Mesa;
  onClick: () => void;
}

export const MesaCard: React.FC<MesaCardProps> = ({ mesa, onClick }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onClick();
  };
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
      w="full"
      aspectRatio="1"
      position="relative"
    >
      <button
        onClick={handleClick}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: statusConfig.bg,
          border: `2px solid ${statusConfig.borderColor}`,
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          cursor: 'pointer',
          color: statusConfig.color,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
      >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center'
      }}>
        {/* Ícone da cadeira */}
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>
          <FaChair />
        </div>

        {/* Número da mesa */}
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
          {mesa.number}
        </div>

        {/* Status */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: statusConfig.bg,
          fontSize: '12px',
          padding: '4px 8px',
          borderRadius: '9999px',
          marginBottom: '8px'
        }}>
          {statusConfig.label}
        </div>

        {/* Tempo de ocupação (se ocupada) */}
        {mesa.status === 'OCCUPIED' && mesa.sessaoAtiva && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', marginBottom: '4px' }}>
            <FaClock />
            <span>{formatTime(mesa.sessaoAtiva.criadoEm)}</span>
          </div>
        )}

        {/* Número de pedidos (se ocupada) */}
        {mesa.status === 'OCCUPIED' && mesa.sessaoAtiva && (
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: statusConfig.bg,
            fontSize: '12px',
            padding: '4px 8px',
            borderRadius: '9999px'
          }}>
            {mesa.sessaoAtiva.pedidos?.length || 0} pedidos
          </div>
        )}
      </div>
      </button>
    </Box>
  );
};