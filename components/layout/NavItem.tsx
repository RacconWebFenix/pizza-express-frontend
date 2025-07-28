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
      variant="ghost"
      colorScheme="whiteAlpha"
      color={isActive ? "white" : "whiteAlpha.800"}
      fontWeight={isActive ? "bold" : "normal"}
      size="sm"
      onClick={() => router.push(href)}
      _hover={{
        bg: "whiteAlpha.200",
        color: "white",
      }}
    >
      {label}
    </Button>
  );
}
