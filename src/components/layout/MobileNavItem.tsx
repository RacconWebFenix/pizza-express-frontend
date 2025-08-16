"use client";

import { Button } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";

interface MobileNavItemProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export default function MobileNavItem({
  href,
  label,
  onClick,
}: MobileNavItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;

  const handleClick = () => {
    router.push(href);
    onClick?.();
  };

  return (
    <Button
      // ALTERADO: Lógica de estilo para o estado ativo
      variant="ghost"
      bg={isActive ? "brand.accent" : "transparent"}
      color={isActive ? "textPrimary" : "gray.700"}
      size="md"
      onClick={handleClick}
      justifyContent="flex-start"
      w="100%"
    >
      {label}
    </Button>
  );
}
