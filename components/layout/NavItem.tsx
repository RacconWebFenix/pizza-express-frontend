"use client";

import { Button } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  label: string;
}

export default function NavItem({ href, label }: NavItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Button
      variant={isActive ? "solid" : "ghost"}
      colorScheme={isActive ? "blue" : "gray"}
      size="sm"
      onClick={() => router.push(href)}
      _hover={{
        bg: isActive ? "blue.600" : "gray.100",
        color: isActive ? "white" : "gray.700",
      }}
    >
      {label}
    </Button>
  );
}
