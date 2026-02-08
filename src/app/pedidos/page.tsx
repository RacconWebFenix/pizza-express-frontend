import { PedidosPageLayout } from "@/features/pedidos/components/PedidosPageLayout";

export const dynamic = "force-dynamic";

/**
 * Rota para /pedidos.
 * Apenas renderiza o layout principal da feature.
 */
export default function PedidosPage() {
  return <PedidosPageLayout />;
}
