"use client";

import { Button, Flex, Icon, Text } from "@chakra-ui/react";
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
  return (
    <Flex direction={{ base: "column", md: "row" }} gap={4}>
      <Button
        onClick={() => router.push(ROUTES.APP.PEDIDOS)}
        size="lg"
        flex="1"
      >
        <Flex align="center" gap="2">
          <Icon as={ClipboardList} />
          <Text>Ver Pedidos</Text>
        </Flex>
      </Button>
      <Button
        onClick={() => router.push(ROUTES.APP.CARDAPIO)}
        size="lg"
        flex="1"
      >
        <Flex align="center" gap="2">
          <Icon as={Utensils} />
          <Text>Ver Cardápio</Text>
        </Flex>
      </Button>
      <Button
        onClick={onShowGerenciarCardapio}
        size="lg"
        colorScheme="orange"
        flex="1"
      >
        <Flex align="center" gap="2">
          <Icon as={Pizza} />
          <Text>Gerenciar Cardápio</Text>
        </Flex>
      </Button>
    </Flex>
  );
};
