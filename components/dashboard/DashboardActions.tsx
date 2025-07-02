"use client";

import { SimpleGrid, Box, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit } from "react-icons/fa";
import { DASHBOARD_CONSTANTS } from "../../constants/dashboard";
import { PizzaButton, PizzaText, PizzaCard } from "../ui";

const MotionBox = motion(Box);

interface ActionButtonProps {
  title: string;
  description: string;
  icon: React.ElementType;
  variant: "primary" | "secondary" | "pizza" | "cheese" | "success";
  onClick: () => void;
  index: number;
}

function ActionButton({
  title,
  description,
  icon,
  variant,
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
      <PizzaCard variant="default" p={6}>
        <PizzaButton
          variant={variant}
          onClick={onClick}
          w="full"
          justifyContent="flex-start"
          gap={4}
          h="auto"
          p={4}
        >
          <Icon as={icon} fontSize="xl" />
          <Box textAlign="left">
            <PizzaText variant="heading" fontSize="md">
              {title}
            </PizzaText>
            <PizzaText variant="caption" mt={1}>
              {description}
            </PizzaText>
          </Box>
        </PizzaButton>
      </PizzaCard>
    </MotionBox>
  );
}

interface DashboardActionsProps {
  onNavigateToCardapio: () => void;
  onNavigateToPedidos: () => void;
  onShowCreateForm: () => void;
}

export function DashboardActions({
  onNavigateToCardapio,
  onNavigateToPedidos,
  onShowCreateForm,
}: DashboardActionsProps) {
  const { GRID, TITLES } = DASHBOARD_CONSTANTS;

  const actions = [
    {
      title: "Ver Cardápio",
      description: "Visualizar todas as pizzas disponíveis",
      icon: FaEdit,
      variant: "pizza" as const,
      onClick: onNavigateToCardapio,
    },
    {
      title: "Ver Pedidos",
      description: "Gerenciar pedidos realizados",
      icon: FaEdit,
      variant: "success" as const,
      onClick: onNavigateToPedidos,
    },
    {
      title: "Criar Pizza",
      description: "Adicionar nova pizza ao cardápio",
      icon: FaPlus,
      variant: "cheese" as const,
      onClick: onShowCreateForm,
    },
  ];

  return (
    <Box>
      <PizzaText variant="heading" fontSize="xl" mb={4}>
        {TITLES.QUICK_ACTIONS}
      </PizzaText>
      <SimpleGrid columns={GRID.ACTIONS_COLUMNS} gap={GRID.GAP}>
        {actions.map((action, index) => (
          <ActionButton
            key={action.title}
            title={action.title}
            description={action.description}
            icon={action.icon}
            variant={action.variant}
            onClick={action.onClick}
            index={index}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
