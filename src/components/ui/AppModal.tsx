"use client";

import {
  Button,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogCloseTrigger,
  DialogBody,
  Portal,
  Box,
} from "@chakra-ui/react";
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
    <DialogRoot
      open={isOpen}
      onOpenChange={(details) => !details.open && onClose()}
    >
      <Portal>
        <Box bg="blackAlpha.600" backdropFilter="blur(2px)">
          <DialogBackdrop />
        </Box>
        <DialogPositioner>
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="xl"
            boxShadow="xl"
            maxW={{ base: "90vw", md: "80vw", lg: "6xl" }}
            w="full"
            maxH="90vh"
            overflowY="auto"
          >
            <DialogContent>
              <Box
                borderBottomWidth="1px"
                borderColor="gray.200"
                _dark={{ borderColor: "gray.600" }}
                p={4}
              >
                <DialogHeader>
                  <Box color="gray.800" _dark={{ color: "white" }}>
                    <DialogTitle>
                      {title}
                    </DialogTitle>
                  </Box>
                  <Box position="absolute" top="12px" right="12px">
                    <DialogCloseTrigger asChild>
                      <Button
                        as="button"
                        variant="ghost"
                        size="sm"
                        aria-label="Close"
                      >
                        <X size={20} color="currentColor" />
                      </Button>
                    </DialogCloseTrigger>
                  </Box>
                </DialogHeader>
              </Box>
              <DialogBody p={6}>{children}</DialogBody>
            </DialogContent>
          </Box>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
};
