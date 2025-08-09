"use client";

import { Box, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { PizzaText } from "./PizzaText";
import { useState, useEffect } from "react";

// 6 tipos diferentes de animações para a pizza
const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-15px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(-8px); }
`;

const swingAnimation = keyframes`
  0%, 100% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
`;

const flipAnimation = keyframes`
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
  100% { transform: rotateY(360deg); }
`;

const wobbleAnimation = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-5deg) scale(1.05); }
  50% { transform: rotate(5deg) scale(0.95); }
  75% { transform: rotate(-3deg) scale(1.02); }
  100% { transform: rotate(0deg) scale(1); }
`;

// Array com todas as animações disponíveis
const animations = [
  { keyframe: rotateAnimation, name: "rotate", duration: "2s" },
  { keyframe: pulseAnimation, name: "pulse", duration: "1.5s" },
  { keyframe: bounceAnimation, name: "bounce", duration: "2.5s" },
  { keyframe: swingAnimation, name: "swing", duration: "2s" },
  { keyframe: flipAnimation, name: "flip", duration: "3s" },
  { keyframe: wobbleAnimation, name: "wobble", duration: "2.8s" },
];

interface PizzaLoadingProps {
  message?: string;
  isVisible?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  fullscreen?: boolean;
  showMessage?: boolean;
}

const sizeMap = {
  sm: 24, // Ícone pequeno para botões
  md: 32, // Ícone médio para cards
  lg: 48, // Ícone grande para seções
  xl: 80, // Extra grande para tela cheia
};

export const PizzaLoading = ({
  message = "Carregando...",
  isVisible = true,
  size = "xl",
  fullscreen = true,
  showMessage = true,
}: PizzaLoadingProps) => {
  // Estado para a animação atual
  const [currentAnimation, setCurrentAnimation] = useState(animations[0]);

  // Escolhe uma animação aleatória quando o componente é montado
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * animations.length);
    setCurrentAnimation(animations[randomIndex]);
  }, []);

  if (!isVisible) return null;

  const iconSize = sizeMap[size];

  // Componente do ícone de pizza com animação aleatória
  const PizzaIcon = (
    <Box
      width={`${iconSize}px`}
      height={`${iconSize}px`}
      backgroundImage="url('/pizza.png')"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      css={{
        animation: `${currentAnimation.keyframe} ${currentAnimation.duration} linear infinite`,
      }}
    />
  );

  // Se não for fullscreen, retorna apenas o ícone (para uso inline)
  if (!fullscreen) {
    return (
      <Box display="inline-flex" alignItems="center" justifyContent="center">
        {PizzaIcon}
      </Box>
    );
  }

  // Versão fullscreen (original)
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.8)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
      backdropFilter="blur(4px)"
    >
      <VStack gap={6}>
        {PizzaIcon}

        {showMessage && (
          <PizzaText
            variant="heading"
            color="white"
            fontSize="xl"
            textAlign="center"
          >
            {message}
          </PizzaText>
        )}
      </VStack>
    </Box>
  );
};
