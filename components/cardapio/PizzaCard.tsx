"use client";

import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  AspectRatio,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatCurrency } from "../../utils/format";

const MotionBox = motion(Box);

interface PizzaCardProps {
  pizza: {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem?: string;
    imagemUrl?: string;
  };
  index: number;
  onPedir: (pizzaId: string, pizzaNome: string) => void;
}

export function PizzaCard({ pizza, index, onPedir }: PizzaCardProps) {
  // URL da imagem - prioriza imagemUrl (Cloudinary) ou imagem local
  const imageUrl = pizza.imagemUrl || pizza.imagem || "/pizza.png";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/pizza.png"; // Fallback para imagem padrão
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="lg"
        overflow="hidden"
        border="2px"
        borderColor="gray.100"
        transition="all 0.2s"
        _hover={{
          borderColor: "brand.pizza",
          boxShadow: "xl",
        }}
      >
        {/* Imagem da Pizza */}
        <AspectRatio ratio={4 / 3}>
          <Box position="relative" w="full" h="full">
            <Image
              src={imageUrl}
              alt={pizza.nome}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
              priority={index < 3} // Prioridade para as 3 primeiras imagens
              onError={handleImageError}
            />

            {/* Overlay com preço */}
            <Box
              position="absolute"
              top={3}
              right={3}
              bg="brand.success"
              color="white"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="lg"
              fontWeight="bold"
              boxShadow="md"
            >
              {formatCurrency(pizza.preco)}
            </Box>
          </Box>
        </AspectRatio>

        {/* Header da Pizza */}
        <Box bg="brand.light" p={4} borderBottom="1px" borderColor="gray.200">
          <Heading size="lg" color="brand.primary" textAlign="center">
            {pizza.nome}
          </Heading>
        </Box>

        {/* Conteúdo */}
        <VStack p={6} gap={4} align="stretch">
          <Text
            color="brand.medium"
            fontSize="md"
            textAlign="center"
            minH="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            lineHeight="1.5"
          >
            {pizza.descricao}
          </Text>

          <Button
            bg="brand.pizza"
            color="white"
            size="lg"
            w="full"
            _hover={{ bg: "brand.accent", transform: "translateY(-1px)" }}
            transition="all 0.2s"
            onClick={() => onPedir(pizza.id, pizza.nome)}
          >
            🍕 Pedir Agora
          </Button>
        </VStack>
      </Box>
    </MotionBox>
  );
}
