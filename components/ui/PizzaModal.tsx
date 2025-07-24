"use client";

import { Box, Button, Dialog, Portal } from "@chakra-ui/react";
import { X } from "lucide-react";

interface PizzaModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export function PizzaModal({
  isOpen,
  onClose,
  title,
  children,
}: PizzaModalProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => !details.open && onClose()}
    >
      <Portal>
        <Box as={Dialog.Backdrop} bg="" backdropFilter="blur(2px)" />
        <Dialog.Positioner>
          <Dialog.Content
            bg="yellow.100"
            borderRadius="xl"
            boxShadow="xl"
            maxW="lg"
            p={0}
          >
            <Dialog.Header borderBottomWidth="1px" borderColor="gray.200" p={4}>
              <Dialog.Title color="blue.700">{title}</Dialog.Title>
              <Dialog.CloseTrigger
                position="absolute"
                top="12px"
                right="12px"
                asChild
              >
                <Button
                  as="button"
                  variant="ghost"
                  size="sm"
                  aria-label="Close"
                  _hover={{ bg: "gray.400" }}
                >
                  <X size={40} color="black" />
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body p={6}>{children}</Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
