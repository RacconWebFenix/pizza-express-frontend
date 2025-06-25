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
      colorScheme={isActive ? "red" : "gray"}
      size="sm"
      onClick={() => router.push(href)}
      _hover={{
        bg: isActive ? "brand.red" : "brand.beige",
        color: isActive ? "white" : "brand.charcoal",
      }}
    >
      {label}
    </Button>
  );
}
