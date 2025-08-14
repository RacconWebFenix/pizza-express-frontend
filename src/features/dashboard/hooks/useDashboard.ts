'use client';

import { useState, useCallback, useEffect } from 'react';

import { getPedidos } from '@/features/pedidos/services/pedidosService';
import { formatCurrency } from '@/utils/format';
import { Pedido } from '@/types/pedidos';
import { toaster } from '@/components/ui/toaster';

interface FormattedDashboardStats {
  faturamentoTotal: string;
  pedidosHoje: string;
  totalDePedidos: string;
  ticketMedio: string;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<FormattedDashboardStats>({
    faturamentoTotal: formatCurrency(0),
    pedidosHoje: '0',
    totalDePedidos: '0',
    ticketMedio: formatCurrency(0),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAndCalculateStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const todosOsPedidos: Pedido[] = await getPedidos();
      const hoje = new Date().toISOString().split('T')[0];
      const pedidosDeHoje = todosOsPedidos.filter(p => p.criadoEm.split('T')[0] === hoje);
      const faturamentoTotal = todosOsPedidos.reduce((total, p) => total + p.pizzas.reduce((sum, pizza) => sum + pizza.preco, 0), 0);
      const totalDePedidos = todosOsPedidos.length;
      const ticketMedio = totalDePedidos > 0 ? faturamentoTotal / totalDePedidos : 0;

      setStats({
        faturamentoTotal: formatCurrency(faturamentoTotal),
        pedidosHoje: pedidosDeHoje.length.toString(),
        totalDePedidos: totalDePedidos.toString(),
        ticketMedio: formatCurrency(ticketMedio),
      });
      setError(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha ao carregar estatísticas.';
      setError(msg);
      toaster.create({ title: 'Erro', description: msg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndCalculateStats();
  }, [fetchAndCalculateStats]);

  return { stats, isLoading, error, refetch: fetchAndCalculateStats };
};