"use client";

import { PizzaLoading } from "@/components/ui";

interface AuthLoadingProps {
  message?: string;
}

export default function AuthLoading({
  message = "Verificando autenticação...",
}: AuthLoadingProps) {
  return (
    <PizzaLoading
      message={message}
      isVisible={true}
      fullscreen={true}
      showMessage={true}
    />
  );
}
