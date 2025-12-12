import { useState, useEffect, useCallback } from 'react';
import { Produto, CreateProdutoData, UpdateProdutoData } from '@/types/produto';
import {
  getProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto
} from '../services/produtosService';

interface UseProdutosReturn {
  produtos: Produto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: CreateProdutoData) => Promise<Produto>;
  update: (id: string, data: UpdateProdutoData) => Promise<Produto>;
  remove: (id: string) => Promise<void>;
  getById: (id: string) => Promise<Produto>;
}

export const useProdutos = (): UseProdutosReturn => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProdutos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProdutos();
      setProdutos(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: CreateProdutoData): Promise<Produto> => {
    try {
      const newProduto = await createProduto(data);
      setProdutos(prev => [...prev, newProduto]);
      return newProduto;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar produto';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, data: UpdateProdutoData): Promise<Produto> => {
    try {
      const updatedProduto = await updateProduto(id, data);
      setProdutos(prev =>
        prev.map(prod => prod.id === id ? updatedProduto : prod)
      );
      return updatedProduto;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar produto';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleDelete = useCallback(async (id: string): Promise<void> => {
    try {
      await deleteProduto(id);
      setProdutos(prev => prev.filter(prod => prod.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar produto';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleGetById = useCallback(async (id: string): Promise<Produto> => {
    try {
      return await getProdutoById(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar produto';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  return {
    produtos,
    isLoading,
    error,
    refetch: fetchProdutos,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
    getById: handleGetById,
  };
};