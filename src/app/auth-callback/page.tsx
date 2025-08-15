import { Suspense } from "react";
import { Flex } from "@chakra-ui/react";

import AuthCallbackView from "./auth-callback-view";
import { PizzaLoading } from "@/components/ui";

// O fallback é a UI de carregamento que o servidor envia.
// Podemos usar o mesmo componente de loading para uma experiência consistente.
function LoadingFallback() {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <PizzaLoading />
    </Flex>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthCallbackView />
    </Suspense>
  );
}
