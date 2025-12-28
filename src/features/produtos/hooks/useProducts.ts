/**
 * Hook para gerenciar estado de produtos
 * @version 1.0.0
 * @since 28/12/2025
 */

import { useState, useCallback, useEffect } from "react";
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product";
import { productsService } from "../services/productsService";
import { toaster } from "@/components/ui/toaster";

interface UseProductsOptions {
  /**
   * Se deve buscar automaticamente na montagem
   */
  autoFetch?: boolean;

  /**
   * ID da categoria para filtrar produtos
   */
  categoryId?: string;

  /**
   * Filtros adicionais
   */
  filters?: {
    active?: boolean;
    search?: string;
  };
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createProduct: (data: CreateProductDto) => Promise<Product>;
  updateProduct: (id: string, data: UpdateProductDto) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
}

/**
 * Hook para gerenciar produtos
 */
export const useProducts = (
  options: UseProductsOptions = {}
): UseProductsReturn => {
  const { autoFetch = true, categoryId, filters } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca produtos
   */
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let data: Product[];

      if (categoryId) {
        data = await productsService.getByCategory(categoryId);
      } else {
        data = await productsService.getWithFilters(filters);
      }

      setProducts(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao buscar produtos";
      setError(errorMessage);
      toaster.error({
        title: "Erro ao buscar produtos",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, filters]);

  /**
   * Refetch manual
   */
  const refetch = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  /**
   * Busca automática na montagem
   */
  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch, fetchProducts]);

  /**
   * Wrapper para criar produto
   */
  const handleCreateProduct = useCallback(
    async (data: CreateProductDto): Promise<Product> => {
      try {
        const newProduct = await productsService.create(data);
        setProducts((prev) => [...prev, newProduct]);
        toaster.success({
          title: "Produto criado",
          description: "Produto foi criado com sucesso!",
        });
        return newProduct;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao criar produto";
        toaster.error({
          title: "Erro ao criar produto",
          description: errorMessage,
        });
        throw err;
      }
    },
    []
  );

  /**
   * Wrapper para atualizar produto
   */
  const handleUpdateProduct = useCallback(
    async (productId: string, data: UpdateProductDto): Promise<Product> => {
      try {
        const updatedProduct = await productsService.update(productId, data);
        setProducts((prev) =>
          prev.map((product) =>
            product.id === productId ? updatedProduct : product
          )
        );
        toaster.success({
          title: "Produto atualizado",
          description: "Produto foi atualizado com sucesso!",
        });
        return updatedProduct;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao atualizar produto";
        toaster.error({
          title: "Erro ao atualizar produto",
          description: errorMessage,
        });
        throw err;
      }
    },
    []
  );

  /**
   * Wrapper para deletar produto
   */
  const handleDeleteProduct = useCallback(
    async (productId: string): Promise<void> => {
      try {
        await productsService.delete(productId);
        setProducts((prev) =>
          prev.filter((product) => product.id !== productId)
        );
        toaster.success({
          title: "Produto deletado",
          description: "Produto foi deletado com sucesso!",
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao deletar produto";
        toaster.error({
          title: "Erro ao deletar produto",
          description: errorMessage,
        });
        throw err;
      }
    },
    []
  );

  return {
    products,
    isLoading,
    error,
    refetch,
    createProduct: handleCreateProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
  };
};
