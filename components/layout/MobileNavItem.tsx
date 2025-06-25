"use client";

import { Button } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";

interface MobileNavItemProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export default function MobileNavItem({ href, label, onClick }: MobileNavItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;

  const handleClick = () => {
    router.push(href);
    onClick?.();
  };

  return (
    <Button
      variant={isActive ? "solid" : "ghost"}
      colorScheme={isActive ? "blue" : "gray"}
      size="md"
      onClick={handleClick}
      justifyContent="flex-start"
      w="100%"
      _hover={{
        bg: isActive ? "brand.primary" : "brand.light",
        color: isActive ? "white" : "brand.primary",
      }}
      bg={isActive ? "brand.primary" : "transparent"}
      color={isActive ? "white" : "brand.medium"}
    >
      {label}
    </Button>
  );
}
