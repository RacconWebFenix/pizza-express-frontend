"use client";

import { PizzaGallery } from "../../components/cardapio/PizzaGallery";
import { usePizzas } from "../../hooks/usePizzas";
// import { useRouter } from "next/navigation";

export default function GaleriaPage() {
  const { pizzas } = usePizzas();
  // const router = useRouter();

  // const handlePedir = (pizzaId: string, pizzaNome: string) => {
  //   // Redirecionar para página de pedidos com a pizza selecionada
  //   router.push(
  //     `/pedidos?pizza=${pizzaId}&nome=${encodeURIComponent(pizzaNome)}`
  //   );
  // };

  return (
    <PizzaGallery
      pizzas={pizzas}

      // error={error}
      // onPedir={handlePedir}
      // title="🖼️ Galeria de Pizzas"
      // emptyMessage="Nenhuma pizza disponível no momento"
    />
  );
}
