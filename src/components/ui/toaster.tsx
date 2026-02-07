"use client"

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastActionTrigger,
  ToastCloseTrigger,
  ToastIndicator,
  createToaster,
  Box,
} from "@chakra-ui/react"
import { isPlainObject } from "@/utils/type-guards";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})

interface ToastViewModel {
  type: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: { label: string; onClick: () => void };
  closable?: boolean;
}

function isToastViewModel(value: unknown): value is ToastViewModel {
  if (!isPlainObject(value)) return false;

  const { type, action } = value;

  if (typeof type !== "string") return false;

  if (action !== undefined && !isPlainObject(action)) return false;

  return true;
}

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster>
        {(toast: unknown) => {
          if (!isToastViewModel(toast)) return null;

          const t = toast;
          return (
            <Box w={{ md: "sm" }}>
              <ToastRoot>
                {t.type === "loading" ? (
                  <Spinner size="sm" color="blue.solid" />
                ) : (
                  <ToastIndicator />
                )}
                <Stack gap="1" flex="1" maxWidth="100%">
                  {t.title && <ToastTitle>{t.title}</ToastTitle>}
                  {t.description && (
                    <ToastDescription>{t.description}</ToastDescription>
                  )}
                </Stack>
                {t.action && (
                  <ToastActionTrigger>{t.action.label}</ToastActionTrigger>
                )}
                {t.closable && <ToastCloseTrigger />}
              </ToastRoot>
            </Box>
          )
        }}
      </ChakraToaster>
    </Portal>
  )
}
