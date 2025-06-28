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
        bg: isActive ? "blue.600" : "gray.100",
        color: isActive ? "white" : "blue.600",
      }}
      bg={isActive ? "blue.600" : "transparent"}
      color={isActive ? "white" : "gray.600"}
    >
      {label}
    </Button>
  );
}
