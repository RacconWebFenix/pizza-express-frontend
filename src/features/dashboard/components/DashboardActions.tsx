"use client";

import { Button, Flex, Icon } from "@chakra-ui/react";
import { Utensils, ClipboardList, Pizza, Users, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { usePermissions } from "@/hooks/usePermissions";

interface DashboardActionsProps {
  onShowGerenciarCardapio: () => void;
}

export const DashboardActions = ({
  onShowGerenciarCardapio,
}: DashboardActionsProps) => {
  const router = useRouter();
  const { canManagePizzas, canManageUsers, canManageDeliveryPersons } =
    usePermissions();

  const secondaryButtonStyle = {
    bg: "background.secondary",
    color: "text.primary",
    _hover: { bg: "background.tertiary" },
  } as const;

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={4}
      w="full"
      flexWrap="wrap"
    >
      {/* Botões Secundários: Usam apenas o secondaryButtonStyle */}
      <Button
        size="lg"
        flex="1"
        minW="200px"
        {...secondaryButtonStyle}
        onClick={() => router.push(ROUTES.APP.PEDIDOS)}
      >
        <Icon as={ClipboardList} mr={2} />
        Ver Pedidos
      </Button>
      <Button
        size="lg"
        flex="1"
        minW="200px"
        {...secondaryButtonStyle}
        onClick={() => router.push(ROUTES.APP.CARDAPIO)}
      >
        <Icon as={Utensils} mr={2} />
        Ver Cardápio
      </Button>

      {/* Botões de Administração - apenas para admin */}
      {canManagePizzas() && (
        <Button
          onClick={onShowGerenciarCardapio}
          size="lg"
          flex="1"
          minW="200px"
          variant="solid"
        >
          <Icon as={Pizza} mr={2} />
          Gerenciar Cardápio
        </Button>
      )}

      {canManageUsers() && (
        <Button
          size="lg"
          flex="1"
          minW="200px"
          {...secondaryButtonStyle}
          onClick={() => router.push("/admin/users")}
        >
          <Icon as={Users} mr={2} />
          Gerenciar Usuários
        </Button>
      )}

      {canManageDeliveryPersons() && (
        <Button
          size="lg"
          flex="1"
          minW="200px"
          {...secondaryButtonStyle}
          onClick={() => router.push("/admin/delivery-persons")}
        >
          <Icon as={Truck} mr={2} />
          Gerenciar Entregadores
        </Button>
      )}
    </Flex>
  );
};
