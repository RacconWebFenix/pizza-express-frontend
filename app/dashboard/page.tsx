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
        <Heading color="brand.red" size="2xl" mb={4}>
          <Flex align="center" justify="center" gap={3}>
            <Icon as={FaChartLine} color="brand.green" />
            Dashboard Administrativo
          </Flex>
        </Heading>
        <Text color="brand.charcoal" fontSize="lg">
          Gerencie sua pizzaria com dados em tempo real
        </Text>
        <Badge colorScheme="green" fontSize="md" mt={2}>
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
              borderRadius="xl"
              boxShadow="lg"
              p={6}
              border="2px"
              borderColor="transparent"
              transition="all 0.2s"
              _hover={{
                borderColor: stat.color,
                boxShadow: "xl",
              }}
            >
              <Flex justify="space-between" align="flex-start" mb={3}>
                <Box>
                  <Text color="gray.600" fontSize="sm" mb={1}>
                    {stat.label}
                  </Text>
                  <Text
                    color="brand.charcoal"
                    fontSize="2xl"
                    fontWeight="bold"
                    mb={1}
                  >
                    {typeof stat.value === "number"
                      ? formatCurrency(stat.value)
                      : stat.value}
                  </Text>
                  <Text color="green.500" fontSize="xs">
                    {stat.helpText}
                  </Text>
                </Box>
                <Box p={3} borderRadius="full" bgGradient={stat.bgGradient}>
                  <Icon as={stat.icon} boxSize={6} color="white" />
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
            borderRadius="xl"
            boxShadow="lg"
            p={6}
            border="2px"
            borderColor="brand.red"
          >
            <VStack align="stretch" gap={4}>
              <Flex align="center" gap={3}>
                <Icon as={FaPizzaSlice} color="brand.red" boxSize={6} />
                <Heading size="lg" color="brand.red">
                  Gestão de Pizzas
                </Heading>
              </Flex>
              <Text color="brand.charcoal">
                Gerencie o cardápio, adicione novas pizzas e edite informações.
              </Text>
              <Flex gap={3} wrap="wrap">
                <Button colorScheme="green">
                  <Icon as={FaPlus} mr={2} />
                  Nova Pizza
                </Button>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={handleNavigateToCardapio}
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
            borderRadius="xl"
            boxShadow="lg"
            p={6}
            border="2px"
            borderColor="brand.green"
          >
            <VStack align="stretch" gap={4}>
              <Flex align="center" gap={3}>
                <Icon as={FaShoppingCart} color="brand.green" boxSize={6} />
                <Heading size="lg" color="brand.green">
                  Gestão de Pedidos
                </Heading>
              </Flex>
              <Text color="brand.charcoal">
                Acompanhe pedidos em tempo real e gerencie entregas.
              </Text>
              <Flex gap={3} wrap="wrap">
                <Button colorScheme="orange" onClick={handleNavigateToPedidos}>
                  Pedidos Ativos
                </Button>
                <Button colorScheme="gray" variant="outline">
                  Histórico
                </Button>
              </Flex>
            </VStack>
          </Box>
        </MotionBox>
      </SimpleGrid>

      {/* Ações Rápidas */}
      <Box bg="white" borderRadius="xl" boxShadow="lg" p={6}>
        <Heading size="lg" color="brand.red" mb={4}>
          Ações Rápidas
        </Heading>
        <Flex gap={4} wrap="wrap" justify="center">
          <Button
            colorScheme="red"
            size="lg"
            onClick={handleNavigateToCardapio}
          >
            Ver Todas as Pizzas
          </Button>
          <Button colorScheme="blue" variant="outline" size="lg">
            Relatórios
          </Button>
          <Button colorScheme="green" variant="outline" size="lg">
            Configurações
          </Button>
          <Button colorScheme="purple" variant="outline" size="lg">
            Backup de Dados
          </Button>
        </Flex>
      </Box>

      {/* Informações Extras */}
      <Box
        bg="brand.cream"
        borderRadius="xl"
        p={6}
        border="2px"
        borderColor="brand.beige"
        textAlign="center"
      >
        <Text color="brand.charcoal" fontSize="sm">
          💡 <strong>Dica:</strong> Use o painel de estatísticas para monitorar
          o desempenho da pizzaria em tempo real. Para acessar funcionalidades
          avançadas, navegue pelas seções específicas.
        </Text>
      </Box>
    </VStack>
  );
}
