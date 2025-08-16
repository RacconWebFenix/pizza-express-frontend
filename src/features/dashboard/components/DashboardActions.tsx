"use client";

import { Button, Flex, Icon } from "@chakra-ui/react";
import { Utensils, ClipboardList, Pizza } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

interface DashboardActionsProps {
  onShowGerenciarCardapio: () => void;
}

export const DashboardActions = ({
  onShowGerenciarCardapio,
}: DashboardActionsProps) => {
  const router = useRouter();

  const secondaryButtonStyle = {
    bg: "background.secondary",
    color: "text.primary",
    _hover: { bg: "background.tertiary" },
  } as const;

  return (
    <Flex direction={{ base: "column", md: "row" }} gap={4} w="full">
      {/* Botões Secundários: Usam apenas o secondaryButtonStyle */}
      <Button
        size="lg"
        flex="1"
        {...secondaryButtonStyle}
        onClick={() => router.push(ROUTES.APP.PEDIDOS)}
      >
        <Icon as={ClipboardList} mr={2} />
        Ver Pedidos
      </Button>
      <Button
        size="lg"
        flex="1"
        {...secondaryButtonStyle}
        onClick={() => router.push(ROUTES.APP.CARDAPIO)}
      >
        <Icon as={Utensils} mr={2} />
        Ver Cardápio
      </Button>

      {/* Botão Primário: Usa apenas a variant="solid" do tema */}
      <Button
        onClick={onShowGerenciarCardapio}
        size="lg"
        flex="1"
        variant="solid"
      >
        <Icon as={Pizza} mr={2} />
        Gerenciar Cardápio
      </Button>
    </Flex>
  );
};
