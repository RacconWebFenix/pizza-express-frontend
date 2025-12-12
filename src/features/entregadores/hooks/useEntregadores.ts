import { useState, useEffect, useCallback } from 'react';
import { Entregador } from '@/types/entregador';
import {
  getEntregadores,
  getEntregadorById,
  createEntregador,
  updateEntregador,
  deleteEntregador
} from '../services/entregadoresService';

interface UseEntregadoresReturn {
  entregadores: Entregador[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: { nome: string; telefone: string }) => Promise<Entregador>;
  update: (id: number, data: { nome?: string; telefone?: string }) => Promise<Entregador>;
  remove: (id: number) => Promise<void>;
  getById: (id: number) => Promise<Entregador>;
}

export const useEntregadores = (): UseEntregadoresReturn => {
  const [entregadores, setEntregadores] = useState<Entregador[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntregadores = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getEntregadores();
      setEntregadores(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar entregadores';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: { nome: string; telefone: string }): Promise<Entregador> => {
    try {
      const newEntregador = await createEntregador(data);
      setEntregadores(prev => [...prev, newEntregador]);
      return newEntregador;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar entregador';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleUpdate = useCallback(async (id: number, data: { nome?: string; telefone?: string }): Promise<Entregador> => {
    try {
      const updatedEntregador = await updateEntregador(id, data);
      setEntregadores(prev =>
        prev.map(ent => ent.id === id ? updatedEntregador : ent)
      );
      return updatedEntregador;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar entregador';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleDelete = useCallback(async (id: number): Promise<void> => {
    try {
      await deleteEntregador(id);
      setEntregadores(prev => prev.filter(ent => ent.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar entregador';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleGetById = useCallback(async (id: number): Promise<Entregador> => {
    try {
      return await getEntregadorById(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar entregador';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  useEffect(() => {
    fetchEntregadores();
  }, [fetchEntregadores]);

  return {
    entregadores,
    isLoading,
    error,
    refetch: fetchEntregadores,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
    getById: handleGetById,
  };
};