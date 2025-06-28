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
      variant={isActive ? "solid" : "ghost"}
      colorScheme={isActive ? "blue" : "gray"}
      size="md"
      onClick={handleClick}
      justifyContent="flex-start"
      w="100%"
      _hover={{
        bg: isActive ? "blue.800" : "gray.200",
        color: isActive ? "white" : "blue.800",
      }}
      bg={isActive ? "blue.700" : "transparent"}
      color={isActive ? "white" : "gray.700"}
    >
      {label}
    </Button>
  );
}
