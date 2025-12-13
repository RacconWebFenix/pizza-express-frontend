import { useState, useEffect, useCallback } from "react";
import {
  Mesa,
  CreateMesaData,
  SessaoMesa,
  AdicionarPedidoMesaData,
} from "@/types/mesa";
import { Pedido } from "@/types/pedidos";
import {
  getMesas,
  getMesaById,
  createMesa,
  abrirSessaoMesa,
  getSessaoAtiva,
  adicionarPedidoMesa,
  fecharConta,
} from "../services/mesasService";

interface UseMesasReturn {
  mesas: Mesa[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: CreateMesaData) => Promise<Mesa>;
  getById: (id: string) => Promise<Mesa>;
  abrirSessao: (mesaId: string) => Promise<SessaoMesa>;
  getSessaoAtiva: (mesaId: string) => Promise<SessaoMesa | null>;
  adicionarPedido: (data: AdicionarPedidoMesaData) => Promise<Pedido>;
  fecharConta: (mesaId: string) => Promise<void>;
}

export const useMesas = (): UseMesasReturn => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMesas = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getMesas();
      setMesas(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao carregar mesas";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(
    async (data: CreateMesaData): Promise<Mesa> => {
      try {
        const newMesa = await createMesa(data);
        setMesas((prev) => [...prev, newMesa]);
        return newMesa;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao criar mesa";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  const handleGetById = useCallback(async (id: string): Promise<Mesa> => {
    try {
      return await getMesaById(id);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao buscar mesa";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleAbrirSessao = useCallback(
    async (mesaId: string): Promise<SessaoMesa> => {
      try {
        const sessao = await abrirSessaoMesa(mesaId);
        // Atualizar mesa com sessão ativa
        setMesas((prev) =>
          prev.map((mesa) =>
            mesa.id === mesaId
              ? { ...mesa, sessaoAtiva: sessao, status: "OCCUPIED" as const }
              : mesa
          )
        );
        return sessao;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao abrir sessão";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  const handleGetSessaoAtiva = useCallback(
    async (mesaId: string): Promise<SessaoMesa | null> => {
      try {
        return await getSessaoAtiva(mesaId);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao buscar sessão ativa";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  const handleAdicionarPedido = useCallback(
    async (data: AdicionarPedidoMesaData): Promise<Pedido> => {
      try {
        const result = await adicionarPedidoMesa(data);
        // Refetch mesas para atualizar dados
        await fetchMesas();
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao adicionar pedido";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [fetchMesas]
  );

  const handleFecharConta = useCallback(
    async (mesaId: string): Promise<void> => {
      try {
        await fecharConta(mesaId);
        // Atualizar mesa para liberada
        setMesas((prev) =>
          prev.map((mesa) =>
            mesa.id === mesaId
              ? {
                  ...mesa,
                  sessaoAtiva: undefined,
                  status: "AVAILABLE" as const,
                }
              : mesa
          )
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao fechar conta";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  useEffect(() => {
    fetchMesas();
  }, [fetchMesas]);

  return {
    mesas,
    isLoading,
    error,
    refetch: fetchMesas,
    create: handleCreate,
    getById: handleGetById,
    abrirSessao: handleAbrirSessao,
    getSessaoAtiva: handleGetSessaoAtiva,
    adicionarPedido: handleAdicionarPedido,
    fecharConta: handleFecharConta,
  };
};
