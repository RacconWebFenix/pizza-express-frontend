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
import { useState } from "react";
import { formatCurrency } from "../../utils/format";
import { IMAGE_CONFIG, isUnreliableDomain } from "../../utils/image-config";
import { Pizza } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "../auth/auth-context";
import { toaster } from "../ui/toaster";

const MotionBox = motion(Box);

interface PizzaCardProps {
  pizza: Pizza;
  index: number;
}

export function PizzaCard({ pizza, index }: PizzaCardProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Array de imagens em ordem de prioridade
  const imageSources = [
    pizza.imagemUrl,
    pizza.imagem,
    IMAGE_CONFIG.DEFAULT_PIZZA_IMAGE, // Fallback final
  ].filter(Boolean); // Remove valores undefined/null

  // URL da imagem com fallback seguro
  const getImageUrl = () => {
    if (imageError && retryCount < imageSources.length - 1) {
      return imageSources[retryCount + 1] || IMAGE_CONFIG.DEFAULT_PIZZA_IMAGE;
    }

    const currentUrl =
      imageSources[retryCount] || IMAGE_CONFIG.DEFAULT_PIZZA_IMAGE;

    // Se é um domínio não confiável, adiciona warning
    if (isUnreliableDomain(currentUrl)) {
      console.warn(`[PizzaCard] Usando domínio não confiável: ${currentUrl}`);
    }

    return currentUrl;
  };

  const imageUrl = getImageUrl();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.warn(
      `[PizzaCard] Falha ao carregar imagem: ${imageUrl} (tentativa ${retryCount + 1})`
    );

    if (retryCount < imageSources.length - 1) {
      setRetryCount((prev) => prev + 1);
      setImageError(true);
      // Tenta a próxima imagem da lista
      const nextImage = imageSources[retryCount + 1];
      e.currentTarget.src = nextImage || IMAGE_CONFIG.DEFAULT_PIZZA_IMAGE;
    } else {
      // Última tentativa: força a imagem padrão
      e.currentTarget.src = IMAGE_CONFIG.DEFAULT_PIZZA_IMAGE;
      setImageError(true);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      toaster.create({
        title: "Acesso Negado",
        description:
          "Você precisa fazer login para adicionar itens ao carrinho.",
        type: "warning",
        duration: 3000,
        closable: true,
      });
      return;
    }

    addToCart(pizza);
    toaster.create({
      title: "Pizza Adicionada!",
      description: `"${pizza.nome}" foi adicionada ao seu carrinho.`,
      type: "success",
      duration: 2000,
      closable: true,
    });
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <Box
        bg="gray.900"
        color="white"
        borderRadius="xl"
        boxShadow="lg"
        overflow="hidden"
        border="1px"
        borderColor="gray.700"
        transition="all 0.3s"
        _hover={{
          borderColor: "orange.500",
          boxShadow: "outline",
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
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />

            {/* Overlay de erro de imagem */}
            {imageError && retryCount >= imageSources.length - 1 && (
              <Box
                position="absolute"
                top={2}
                left={2}
                bg="red.500"
                color="white"
                px={2}
                py={1}
                borderRadius="md"
                fontSize="xs"
                opacity={0.8}
              >
                📷 Imagem indisponível
              </Box>
            )}

            {/* Overlay com preço */}
            <Box
              position="absolute"
              top={3}
              right={3}
              bg="orange.500"
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
        <Box
          bg="blackAlpha.400"
          p={4}
          borderBottom="1px"
          borderColor="gray.700"
        >
          <Heading size="lg" color="whiteAlpha.900" textAlign="center">
            {pizza.nome}
          </Heading>
        </Box>

        {/* Conteúdo */}
        <VStack p={6} gap={4} align="stretch">
          <Text
            color="whiteAlpha.700"
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
            colorScheme="orange"
            size="lg"
            w="full"
            _hover={{ bg: "orange.600" }}
            transition="all 0.2s"
            onClick={handleAddToCart}
          >
            🍕 Pedir Agora
          </Button>
        </VStack>
      </Box>
    </MotionBox>
  );
}
