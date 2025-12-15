"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Categoria, CreateCategoriaData, UpdateCategoriaData } from '@/types/categoria';
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from '../services/categoriasService';
import { toaster } from '@/components/ui/toaster';

interface CategoriasContextType {
  categorias: Categoria[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: CreateCategoriaData) => Promise<Categoria>;
  update: (id: string, data: UpdateCategoriaData) => Promise<Categoria>;
  remove: (id: string) => Promise<void>;
  getById: (id: string) => Promise<Categoria>;
  refreshFromServer: () => Promise<void>;
}

const CategoriasContext = createContext<CategoriasContextType | undefined>(undefined);

export const useCategoriasContext = () => {
  const context = useContext(CategoriasContext);
  if (context === undefined) {
    throw new Error('useCategoriasContext must be used within a CategoriasProvider');
  }
  return context;
};

interface CategoriasProviderProps {
  children: ReactNode;
}

export const CategoriasProvider: React.FC<CategoriasProviderProps> = ({ children }) => {
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
      toaster.success({
        title: "Categoria criada",
        description: `A categoria "${newCategoria.name}" foi criada com sucesso.`,
      });
      return newCategoria;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar categoria';
      toaster.error({
        title: "Erro ao criar categoria",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, data: UpdateCategoriaData): Promise<Categoria> => {
    try {
      const updatedCategoria = await updateCategoria(id, data);
      setCategorias(prev =>
        prev.map(cat => cat.id === id ? updatedCategoria : cat)
      );
      toaster.success({
        title: "Categoria atualizada",
        description: `A categoria "${updatedCategoria.name}" foi atualizada com sucesso.`,
      });
      return updatedCategoria;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar categoria';
      toaster.error({
        title: "Erro ao atualizar categoria",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }, []);

  const handleDelete = useCallback(async (id: string): Promise<void> => {
    try {
      const categoriaToDelete = categorias.find(cat => cat.id === id);
      await deleteCategoria(id);
      setCategorias(prev => prev.filter(cat => cat.id !== id));
      toaster.success({
        title: "Categoria deletada",
        description: `A categoria "${categoriaToDelete?.name || 'Categoria'}" foi deletada com sucesso.`,
      });
    } catch (err) {
      const error = err as Error;
      const errorMessage = error.message || 'Erro ao deletar categoria';

      // Se a categoria não foi encontrada (404), considere como sucesso
      // pois ela já não existe no backend
      if (errorMessage.includes('not found') || errorMessage.includes('404')) {
        setCategorias(prev => prev.filter(cat => cat.id !== id));
        toaster.success({
          title: "Categoria removida",
          description: "A categoria foi removida da lista (já não existia no servidor).",
        });
        return;
      }

      toaster.error({
        title: "Erro ao deletar categoria",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }, [categorias]);

  // Função para recarregar dados do servidor (útil para sincronização)
  const refreshFromServer = useCallback(async () => {
    try {
      const serverData = await getCategorias();
      setCategorias(serverData);
      toaster.info({
        title: "Lista atualizada",
        description: "Dados sincronizados com o servidor.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao sincronizar dados';
      toaster.error({
        title: "Erro na sincronização",
        description: errorMessage,
      });
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

  const value: CategoriasContextType = {
    categorias,
    isLoading,
    error,
    refetch: fetchCategorias,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
    getById: handleGetById,
    refreshFromServer,
  };

  return (
    <CategoriasContext.Provider value={value}>
      {children}
    </CategoriasContext.Provider>
  );
};