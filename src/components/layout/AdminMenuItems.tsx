"use client";

import { Text, Menu } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface AdminMenuItem {
  label: string;
  href: string;
}

interface AdminMenuItemsProps {
  items: AdminMenuItem[];
}

export function AdminMenuItems({ items }: AdminMenuItemsProps) {
  const router = useRouter();

  return (
    <Menu.ItemGroup title="Administração">
      {items.map((item) => (
        <Menu.Item
          key={item.href}
          value={item.href}
          onClick={() => router.push(item.href)}
          _hover={{ bg: "gray.700", cursor: "pointer" }}
        >
          <Text>{item.label}</Text>
        </Menu.Item>
      ))}
    </Menu.ItemGroup>
  );
}
