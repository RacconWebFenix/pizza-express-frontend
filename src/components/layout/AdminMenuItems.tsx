"use client";

import { MenuItemGroup, MenuItemGroupLabel, MenuItem, MenuItemText, Box } from "@chakra-ui/react";
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
    <MenuItemGroup>
      <MenuItemGroupLabel>Administração</MenuItemGroupLabel>
      {items.map((item) => (
        <MenuItem key={item.href} value={item.href}>
          <Box
            onClick={() => router.push(item.href)}
            _hover={{ bg: "gray.700", cursor: "pointer" }}
            w="full"
            display="flex"
            alignItems="center"
          >
            <MenuItemText>{item.label}</MenuItemText>
          </Box>
        </MenuItem>
      ))}
    </MenuItemGroup>
  );
}
