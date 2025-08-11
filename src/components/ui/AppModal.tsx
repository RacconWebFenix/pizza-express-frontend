"use client";

import { Box, Button, Dialog, Portal } from "@chakra-ui/react";
import { X } from "lucide-react";
import { ReactNode } from "react";

// A interface de props agora tem um nome genérico
interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

/**
 * Componente de Modal genérico para toda a aplicação.
 */
export const AppModal = ({
  isOpen,
  onClose,
  title,
  children,
}: AppModalProps) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => !details.open && onClose()}
    >
      <Portal>
        <Box
          as={Dialog.Backdrop}
          bg="blackAlpha.600"
          backdropFilter="blur(2px)"
        />
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="xl"
            boxShadow="xl"
            maxW={{ base: "90vw", md: "80vw", lg: "6xl" }}
            w="full"
            maxH="90vh"
            overflowY="auto"
            p={0}
          >
            <Dialog.Header
              borderBottomWidth="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.600" }}
              p={4}
            >
              <Dialog.Title color="gray.800" _dark={{ color: "white" }}>
                {title}
              </Dialog.Title>
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
                >
                  <X size={20} color="currentColor" />
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body p={6}>{children}</Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
