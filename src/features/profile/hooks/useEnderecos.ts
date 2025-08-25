"use client";

import { useState, useCallback, useEffect } from "react";
import type { Endereco } from "@/types/endereco";
import {
  getEnderecos,
  createEndereco,
  updateEndereco,
  deleteEndereco,
  CreateEnderecoData,
  UpdateEnderecoData,
} from "../services/enderecoService";
import { toaster } from "@/components/ui/toaster";

export const useEnderecos = () => {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnderecos = useCallback(async () => {
    try {
      setIsLoading(true);
      const enderecosData = await getEnderecos();
      setEnderecos(enderecosData);
      setError(null);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Falha ao carregar endereços.";
      setError(msg);
      toaster.create({ title: "Erro", description: msg, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addEndereco = useCallback(async (data: CreateEnderecoData) => {
    try {
      const novoEndereco = await createEndereco(data);
      setEnderecos((prev) => [...prev, novoEndereco]);
      toaster.create({
        title: "Sucesso",
        description: "Endereço adicionado com sucesso!",
        type: "success",
      });
      return novoEndereco;
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Falha ao adicionar endereço.";
      toaster.create({ title: "Erro", description: msg, type: "error" });
      throw err;
    }
  }, []);

  const editEndereco = useCallback(
    async (enderecoId: number, data: UpdateEnderecoData) => {
      try {
        const enderecoAtualizado = await updateEndereco(enderecoId, data);
        setEnderecos((prev) =>
          prev.map((endereco) =>
            endereco.id === enderecoId ? enderecoAtualizado : endereco
          )
        );
        toaster.create({
          title: "Sucesso",
          description: "Endereço atualizado com sucesso!",
          type: "success",
        });
        return enderecoAtualizado;
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Falha ao atualizar endereço.";
        toaster.create({ title: "Erro", description: msg, type: "error" });
        throw err;
      }
    },
    []
  );

  const removeEndereco = useCallback(async (enderecoId: number) => {
    try {
      await deleteEndereco(enderecoId);
      setEnderecos((prev) =>
        prev.filter((endereco) => endereco.id !== enderecoId)
      );
      toaster.create({
        title: "Sucesso",
        description: "Endereço removido com sucesso!",
        type: "success",
      });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Falha ao remover endereço.";
      toaster.create({ title: "Erro", description: msg, type: "error" });
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchEnderecos();
  }, [fetchEnderecos]);

  return {
    enderecos,
    isLoading,
    error,
    refetch: fetchEnderecos,
    addEndereco,
    editEndereco,
    removeEndereco,
  };
};
