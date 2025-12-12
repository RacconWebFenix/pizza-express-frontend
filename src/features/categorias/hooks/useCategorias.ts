import { useState, useEffect, useCallback } from 'react';
import { Categoria, CreateCategoriaData, UpdateCategoriaData } from '@/types/categoria';
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from '../services/categoriasService';

interface UseCategoriasReturn {
  categorias: Categoria[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: CreateCategoriaData) => Promise<Categoria>;
  update: (id: string, data: UpdateCategoriaData) => Promise<Categoria>;
  remove: (id: string) => Promise<void>;
  getById: (id: string) => Promise<Categoria>;
}

export const useCategorias = (): UseCategoriasReturn => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getCategorias();
      setCategorias(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar categorias';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: CreateCategoriaData): Promise<Categoria> => {
    try {
      const newCategoria = await createCategoria(data);
      setCategorias(prev => [...prev, newCategoria]);
      return newCategoria;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, data: UpdateCategoriaData): Promise<Categoria> => {
    try {
      const updatedCategoria = await updateCategoria(id, data);
      setCategorias(prev =>
        prev.map(cat => cat.id === id ? updatedCategoria : cat)
      );
      return updatedCategoria;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleDelete = useCallback(async (id: string): Promise<void> => {
    try {
      await deleteCategoria(id);
      setCategorias(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleGetById = useCallback(async (id: string): Promise<Categoria> => {
    try {
      return await getCategoriaById(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  return {
    categorias,
    isLoading,
    error,
    refetch: fetchCategorias,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
    getById: handleGetById,
  };
};