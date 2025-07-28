// /components/dashboard/DashboardActions.tsx
"use client";

import { SimpleGrid, Box, Icon, Text, VStack, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TbSettingsPlus } from "react-icons/tb";
import { MdOutlineInventory, MdRestaurantMenu } from "react-icons/md";
import { DASHBOARD_CONSTANTS } from "../../constants/dashboard";
import { PizzaButton } from "../ui";
import { ElementType } from "react";

const MotionBox = motion(Box);

// Props do nosso botão de ação, mantendo o onClick
interface ActionButtonProps {
  title: string;
  description: string;
  icon: ElementType;
  onClick: () => void;
  index: number;
}

// Componente ActionButton refatorado para parecer um card
function ActionButton({
  title,
  description,
  icon,
  onClick,
  index,
}: ActionButtonProps) {
  const { ANIMATIONS } = DASHBOARD_CONSTANTS;
  return (
    <MotionBox
      initial={ANIMATIONS.FADE_IN.initial}
      animate={ANIMATIONS.FADE_IN.animate}
      transition={{ ...ANIMATIONS.FADE_IN.transition, delay: index * 0.1 }}
    >
      {/* Usamos o seu PizzaButton como base para o card clicável */}
      <PizzaButton
        variant="outline" // Usamos 'outline' para ter uma borda visível
        onClick={onClick}
        w="full"
        h="auto" // Altura automática para se ajustar ao conteúdo
        p={6}
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.700"
        bg="gray.900" // Fundo escuro
        color="whiteAlpha.800" // Cor clara para o texto
        _hover={{
          transform: "translateY(-8px)",
          boxShadow: "lg",
          color: "orange.400", // Cor do ícone e texto muda para laranja
          borderColor: "orange.400", // Borda muda para laranja
          bg: "gray.800", // Fundo levemente mais claro no hover
        }}
      >
        {/* Usando VStack para alinhar ícone e texto verticalmente */}
        <VStack spacing={3}>
          <Icon as={icon} boxSize={8} />
          <Box textAlign="center">
            <Text fontFamily="heading" fontWeight="bold" fontSize="lg">
              {title}
            </Text>
            <Text fontSize="sm" color="whiteAlpha.600" mt={1}>
              {description}
            </Text>
          </Box>
        </VStack>
      </PizzaButton>
    </MotionBox>
  );
}

// Props do componente principal
interface DashboardActionsProps {
  onNavigateToCardapio: () => void;
  onNavigateToPedidos: () => void;
  onShowCreateForm: () => void;
}

// Componente principal que monta a seção
export function DashboardActions({
  onNavigateToCardapio,
  onNavigateToPedidos,
  onShowCreateForm,
}: DashboardActionsProps) {
  const { TITLES } = DASHBOARD_CONSTANTS;
  const actions = [
    {
      title: "Ver Cardápio",
      description: "Visualizar todas as pizzas",
      icon: MdRestaurantMenu,
      onClick: onNavigateToCardapio,
    },
    {
      title: "Ver Pedidos",
      description: "Gerenciar pedidos realizados",
      icon: MdOutlineInventory,
      onClick: onNavigateToPedidos,
    },
    {
      title: "Gerenciar Cardápio",
      description: "Adicionar ou editar pizzas",
      icon: TbSettingsPlus,
      onClick: onShowCreateForm,
    },
  ];

  return (
    <Box>
      <Heading size="lg" mb={6} color="gray.700">
        {TITLES.QUICK_ACTIONS}
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {actions.map((action, index) => (
          <ActionButton key={action.title} {...action} index={index} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
