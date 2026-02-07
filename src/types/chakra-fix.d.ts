import "react";

declare module "@chakra-ui/react" {
    // Menu
    export interface MenuRootProps { children?: React.ReactNode; }
    export interface MenuContentProps { children?: React.ReactNode; }
    export interface MenuItemProps { children?: React.ReactNode; value?: string; }
    export interface MenuTriggerProps { children?: React.ReactNode; asChild?: boolean; }
    export interface MenuItemGroupProps { children?: React.ReactNode; }
    export interface MenuItemGroupLabelProps { children?: React.ReactNode; }
    export interface MenuItemTextProps { children?: React.ReactNode; }
    export interface MenuPositionerProps { children?: React.ReactNode; }

    // Avatar
    export interface AvatarRootProps { children?: React.ReactNode; }
    export interface AvatarImageProps { src?: string; alt?: string; }
    export interface AvatarFallbackProps { children?: React.ReactNode; }

    // Dialog
    export interface DialogRootProps {
        children?: React.ReactNode;
        open?: boolean;
        onOpenChange?: (details: { open: boolean }) => void;
    }
    export interface DialogContentProps { children?: React.ReactNode; }
    export interface DialogBodyProps { children?: React.ReactNode; }
    export interface DialogHeaderProps { children?: React.ReactNode; }
    export interface DialogTitleProps { children?: React.ReactNode; }
    export interface DialogFooterProps { children?: React.ReactNode; }
    export interface DialogPositionerProps { children?: React.ReactNode; }
    export interface DialogBackdropProps { children?: React.ReactNode; }
    export interface DialogCloseTriggerProps { children?: React.ReactNode; asChild?: boolean; }
    export interface DialogTriggerProps { children?: React.ReactNode; asChild?: boolean; }

    // Toaster / Toast
    export interface ToasterProps {
        children?: React.ReactNode | ((toast: unknown) => React.ReactNode);
    }
    export interface ToastRootProps { children?: React.ReactNode; }
    export interface ToastTitleProps { children?: React.ReactNode; }
    export interface ToastDescriptionProps { children?: React.ReactNode; }
    export interface ToastActionTriggerProps { children?: React.ReactNode; }
    export interface ToastCloseTriggerProps { children?: React.ReactNode; }
}
