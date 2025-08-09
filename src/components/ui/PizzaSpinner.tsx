"use client";

import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
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

interface PizzaSpinnerProps {
  size?: number;
}

export const PizzaSpinner = ({ size = 24 }: PizzaSpinnerProps) => {
  // Estado para a animação atual
  const [currentAnimation, setCurrentAnimation] = useState(animations[0]);

  // Escolhe uma animação aleatória quando o componente é montado
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * animations.length);
    setCurrentAnimation(animations[randomIndex]);
  }, []);

  return (
    <Box
      width={`${size}px`}
      height={`${size}px`}
      backgroundImage="url('/pizza.png')"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      css={{
        animation: `${currentAnimation.keyframe} ${currentAnimation.duration} linear infinite`,
      }}
    />
  );
};
