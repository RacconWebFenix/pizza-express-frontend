"use client";

import { Button as ChakraButton, ButtonProps, HStack } from "@chakra-ui/react";

// 1. Importe as duas ferramentas geradas pelo PandaCSS.
// O caminho pode variar um pouco dependendo da sua estrutura de pastas.
// Ajuste se o VSCode sublinhar em vermelho. O caminho correto geralmente é
// a partir da raiz do projeto.
import { cx } from "@/styled-system/css";
import { button } from "@/styled-system/recipes";
import { PizzaSpinner } from "./PizzaSpinner";

// A interface não precisa mudar, mas agora ela reflete as
// variantes da nossa recipe.
interface PizzaButtonProps
  extends Omit<ButtonProps, "colorScheme" | "variant"> {
  variant?: "primary" | "pizza"; // As variantes que definimos no theme.ts
  size?: "md" | "lg"; // Os tamanhos que definimos no theme.ts
  loading?: boolean;
}

export function PizzaButton({
  variant,
  size,
  loading,
  className,
  children,
  ...props
}: PizzaButtonProps) {
  // 2. Aqui está a mágica: a função `button()` gera as classes CSS corretas
  // com base nas variantes que você passar como props (ex: variant="pizza").
  const buttonClasses = button({ variant, size });

  return (
    // 3. Usamos o componente do Chakra, mas passamos nossas classes customizadas.
    // A função `cx()` combina as classes da nossa recipe com qualquer outra classe
    // que possa ser passada externamente, garantindo flexibilidade.
    <ChakraButton className={cx(buttonClasses, className)} {...props}>
      <HStack>{loading ? <PizzaSpinner size={20} /> : children}</HStack>
    </ChakraButton>
  );
}
