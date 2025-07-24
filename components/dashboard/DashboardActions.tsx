"use client";

import { SimpleGrid, Box, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TbSettingsPlus } from "react-icons/tb";
import { MdOutlineInventory, MdRestaurantMenu } from "react-icons/md";
import { DASHBOARD_CONSTANTS } from "../../constants/dashboard";
import { PizzaButton, PizzaCard, PizzaText } from "../ui";

const MotionBox = motion(Box);

interface ActionButtonProps {
  title: string;
  description: string;
  icon: React.ElementType;
  variant: "solid" | "outline" | "ghost";
  className?: string;
  onClick: () => void;
  index: number;
}

function ActionButton({
  title,
  description,
  icon,
  variant,
  className = "",
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
      <PizzaButton
        variant={variant}
        size="lg"
        onClick={onClick}
        w="full"
        justifyContent="flex-start"
        gap={6}
        h="auto"
        p={5}
        borderWidth={variant === "outline" ? 2 : 0}
        borderColor={variant === "outline" ? "brand.pizza" : undefined}
        aria-label={title}
        className={className}
        _hover={{
          transform: "scale(1.03)",
          boxShadow: "xl",
          bg: variant === "ghost" ? "brand.light" : undefined,
        }}
      >
        <Icon as={icon} boxSize={12} color="brand.primary" />
        <Box textAlign="left" ml={2} flex="1">
          <PizzaText variant="heading" fontSize="xl" color="brand.primary">
            {title}
          </PizzaText>
          <PizzaText variant="caption" mt={2} color="brand.medium">
            {description}
          </PizzaText>
        </Box>
      </PizzaButton>
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
      icon: MdRestaurantMenu,
      variant: "solid" as const,
      className: "button-pizza",
      onClick: onNavigateToCardapio,
    },
    {
      title: "Ver Pedidos",
      description: "Gerenciar pedidos realizados",
      icon: MdOutlineInventory,
      variant: "solid" as const,
      className: "button-primary",
      onClick: onNavigateToPedidos,
    },
    {
      title: "Gerenciar Pizzas",
      description: "Gerenciar pizzas do cardápio",
      icon: TbSettingsPlus,
      variant: "solid" as const,
      className: "button-primary",
      onClick: onShowCreateForm,
    },
  ];
  return (
    <Box>
      <PizzaText variant="heading" fontSize="xl" mb={4}>
        {TITLES.QUICK_ACTIONS}
      </PizzaText>
      <PizzaCard variant="pizza" p={6}>
        <SimpleGrid columns={GRID.ACTIONS_COLUMNS} gap={GRID.GAP}>
          {actions.map((action, index) => (
            <ActionButton
              key={action.title}
              title={action.title}
              description={action.description}
              icon={action.icon}
              variant={action.variant}
              className={action.className}
              onClick={action.onClick}
              index={index}
            />
          ))}
        </SimpleGrid>
      </PizzaCard>
    </Box>
  );
}
