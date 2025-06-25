"use client";

import {
  Box,
  Heading,
  VStack,
  SimpleGrid,
  Text,
  Button,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaPizzaSlice,
  FaShoppingCart,
  FaPlus,
  FaEdit,
  FaChartLine,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { formatCurrency } from "@/utils/format";
import { mockDashboardStats } from "@/mock";

const MotionBox = motion(Box);

export default function DashboardPage() {
  const router = useRouter();
  const stats = mockDashboardStats;

  const handleNavigateToCardapio = () => {
    router.push(ROUTES.APP.CARDAPIO);
  };

  const handleNavigateToPedidos = () => {
    router.push(ROUTES.APP.PEDIDOS);
  };

  return (
    <VStack gap={8} align="stretch" w="full">
      {/* Header */}
      <Box textAlign="center" py={6}>
        <Heading color="brand.primary" size="2xl" mb={4}>
          <Flex align="center" justify="center" gap={3}>
            <Icon as={FaChartLine} color="brand.accent" />
            Dashboard Administrativo
          </Flex>
        </Heading>
        <Text color="brand.medium" fontSize="lg">
          Gerencie sua pizzaria com dados em tempo real
        </Text>
        <Badge colorScheme="blue" fontSize="md" mt={2}>
          Última atualização: agora
        </Badge>
      </Box>

      {/* Estatísticas */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
        {stats.map((stat, index) => (
          <MotionBox
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <Box
              bg="white"
              borderRadius="2xl"
              boxShadow="md"
              p={6}
              border="1px"
              borderColor="gray.100"
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{
                borderColor: "brand.accent",
                boxShadow: "xl",
                transform: "translateY(-4px)",
              }}
            >
              <Flex justify="space-between" align="flex-start" mb={4}>
                <Box flex="1">
                  <Text
                    color="brand.medium"
                    fontSize="sm"
                    mb={2}
                    fontWeight="600"
                  >
                    {stat.label}
                  </Text>
                  <Text
                    color="brand.dark"
                    fontSize="3xl"
                    fontWeight="800"
                    mb={2}
                    lineHeight="1"
                  >
                    {typeof stat.value === "number"
                      ? formatCurrency(stat.value)
                      : stat.value}
                  </Text>
                  <Text color="brand.fresh" fontSize="sm" fontWeight="500">
                    {stat.helpText}
                  </Text>
                </Box>
                <Box
                  p={4}
                  borderRadius="xl"
                  bgGradient={stat.bgGradient}
                  boxShadow="md"
                >
                  <Icon as={stat.icon} boxSize={7} color="white" />
                </Box>
              </Flex>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>

      {/* Ações Administrativas */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        {/* Gestão de Pizzas */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="md"
            p={8}
            border="1px"
            borderColor="brand.pizza"
            transition="all 0.3s"
            _hover={{
              boxShadow: "xl",
              transform: "translateY(-2px)",
            }}
          >
            <VStack align="stretch" gap={5}>
              <Flex align="center" gap={4}>
                <Icon as={FaPizzaSlice} color="brand.pizza" boxSize={8} />
                <Heading size="xl" color="brand.primary" fontWeight="700">
                  Gestão de Pizzas
                </Heading>
              </Flex>
              <Text color="brand.medium" fontSize="lg" lineHeight="tall">
                Gerencie o cardápio, adicione novas pizzas e edite informações.
              </Text>
              <Flex gap={4} wrap="wrap">
                <Button
                  bg="brand.fresh"
                  color="white"
                  size="lg"
                  borderRadius="xl"
                  fontWeight="600"
                  _hover={{
                    bg: "brand.success",
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.3s"
                >
                  <Icon as={FaPlus} mr={2} />
                  Nova Pizza
                </Button>
                <Button
                  bg="brand.accent"
                  color="white"
                  size="lg"
                  borderRadius="xl"
                  fontWeight="600"
                  onClick={handleNavigateToCardapio}
                  _hover={{
                    bg: "brand.primary",
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.3s"
                >
                  <Icon as={FaEdit} mr={2} />
                  Editar Cardápio
                </Button>
              </Flex>
            </VStack>
          </Box>
        </MotionBox>

        {/* Gestão de Pedidos */}
        <MotionBox
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="md"
            p={8}
            border="1px"
            borderColor="brand.accent"
            transition="all 0.3s"
            _hover={{
              boxShadow: "xl",
              transform: "translateY(-2px)",
            }}
          >
            <VStack align="stretch" gap={5}>
              <Flex align="center" gap={4}>
                <Icon as={FaShoppingCart} color="brand.accent" boxSize={8} />
                <Heading size="xl" color="brand.primary" fontWeight="700">
                  Gestão de Pedidos
                </Heading>
              </Flex>
              <Text color="brand.medium" fontSize="lg" lineHeight="tall">
                Acompanhe pedidos em tempo real e gerencie entregas.
              </Text>
              <Flex gap={4} wrap="wrap">
                <Button
                  bg="brand.pizza"
                  color="white"
                  size="lg"
                  borderRadius="xl"
                  fontWeight="600"
                  onClick={handleNavigateToPedidos}
                  _hover={{
                    bg: "brand.warning",
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.3s"
                >
                  Pedidos Ativos
                </Button>
                <Button
                  variant="outline"
                  borderColor="brand.medium"
                  color="brand.medium"
                  size="lg"
                  borderRadius="xl"
                  fontWeight="600"
                  _hover={{
                    bg: "brand.light",
                    borderColor: "brand.primary",
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.3s"
                >
                  Histórico
                </Button>
              </Flex>
            </VStack>
          </Box>
        </MotionBox>
      </SimpleGrid>

      {/* Ações Rápidas */}
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
        p={8}
        border="1px"
        borderColor="gray.100"
      >
        <Heading
          size="xl"
          color="brand.primary"
          mb={6}
          fontWeight="700"
          textAlign="center"
        >
          Ações Rápidas
        </Heading>
        <Flex gap={4} wrap="wrap" justify="center">
          <Button
            bg="brand.pizza"
            color="white"
            size="lg"
            borderRadius="xl"
            px={8}
            py={6}
            fontSize="lg"
            fontWeight="600"
            _hover={{ bg: "brand.accent", transform: "translateY(-2px)" }}
            onClick={handleNavigateToCardapio}
            transition="all 0.3s"
            boxShadow="md"
          >
            Ver Todas as Pizzas
          </Button>
          <Button
            variant="outline"
            borderColor="brand.accent"
            color="brand.accent"
            size="lg"
            borderRadius="xl"
            px={8}
            py={6}
            fontSize="lg"
            fontWeight="600"
            _hover={{
              bg: "brand.light",
              transform: "translateY(-2px)",
              borderColor: "brand.primary",
            }}
            transition="all 0.3s"
          >
            Relatórios
          </Button>
          <Button
            variant="outline"
            borderColor="brand.fresh"
            color="brand.fresh"
            size="lg"
            borderRadius="xl"
            px={8}
            py={6}
            fontSize="lg"
            fontWeight="600"
            _hover={{
              bg: "#F0FDF4",
              transform: "translateY(-2px)",
              borderColor: "brand.success",
            }}
            transition="all 0.3s"
          >
            Configurações
          </Button>
          <Button
            variant="outline"
            borderColor="brand.medium"
            color="brand.medium"
            size="lg"
            borderRadius="xl"
            px={8}
            py={6}
            fontSize="lg"
            fontWeight="600"
            _hover={{
              bg: "brand.light",
              transform: "translateY(-2px)",
              borderColor: "brand.primary",
            }}
            transition="all 0.3s"
          >
            Backup de Dados
          </Button>
        </Flex>
      </Box>

      {/* Informações Extras */}
      <Box
        bg="linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)"
        borderRadius="2xl"
        p={8}
        border="1px"
        borderColor="gray.200"
        textAlign="center"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="-50px"
          right="-50px"
          w="100px"
          h="100px"
          bg="brand.accent"
          opacity="0.1"
          borderRadius="full"
        />
        <Text
          color="brand.dark"
          fontSize="lg"
          fontWeight="500"
          lineHeight="tall"
        >
          💡 <strong>Dica Profissional:</strong> Use o painel de estatísticas
          para monitorar o desempenho da pizzaria em tempo real. Para acessar
          funcionalidades avançadas, navegue pelas seções específicas.
        </Text>
      </Box>
    </VStack>
  );
}
