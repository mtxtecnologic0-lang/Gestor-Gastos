'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useExpenseStore } from '@/store/expenseStore';
import { useDashboardData } from '@/hooks/useDashboardData';
import { MetricCard } from '@/components/ui/MetricCard';
import { Button } from '@/components/ui/Button';
import { SpendingByDayChart, SpendingByCategoryChart } from '../components/charts/SpendingChart';
import { formatCurrency, formatDate } from '@/lib/formatters';

export default function DashboardPage() {
  const { loadExpenses, openModal, loading, error } = useExpenseStore();
  const { metrics, byCategory, byDay, recentExpenses } = useDashboardData();

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Cargando gastos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 font-medium">{error}</p>
          <Button onClick={loadExpenses} variant="secondary" size="sm" className="mt-3">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">Resumen de tus gastos este mes</p>
        </div>
        <Button onClick={() => openModal()} size="md">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo gasto
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total este mes"
          value={formatCurrency(metrics.totalThisMonth)}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <MetricCard
          label="Promedio diario"
          value={formatCurrency(metrics.dailyAverage)}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <MetricCard
          label="Mayor categoría"
          value={metrics.topCategory}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          }
        />
        <MetricCard
          label="Transacciones"
          value={String(metrics.transactionCount)}
          subtitle="este mes"
        />
      </div>

      {/* Charts + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-6">Análisis de Gastos</h2>

          {byDay.length > 0 ? (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Por día</p>
                <SpendingByDayChart data={byDay} />
              </div>
              {byCategory.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Por categoría</p>
                  <SpendingByCategoryChart data={byCategory} />
                </div>
              )}
            </div>
          ) : (
            <div className="h-[220px] flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl">
              <p className="text-sm text-gray-400">Sin datos para este mes</p>
            </div>
          )}
        </div>

        {/* Recent expenses */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">Últimos gastos</h2>
            <Link href="/expenses" className="text-xs text-gray-500 hover:text-gray-900 font-medium">
              Ver todos →
            </Link>
          </div>

          {recentExpenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <p className="text-sm text-gray-400">Sin gastos recientes</p>
              <Button size="sm" variant="ghost" onClick={() => openModal()} className="mt-3">
                + Agregar gasto
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-base">
                    {getCategoryEmoji(expense.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{expense.description}</p>
                    <p className="text-xs text-gray-400">{formatDate(expense.date)}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link href="/expenses">
              <Button variant="secondary" size="sm" className="w-full">
                Ver todos los gastos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Comida: '🍔',
    Transporte: '🚗',
    Entretenimiento: '🎬',
    Salud: '🏥',
    Compras: '🛍️',
    Servicios: '⚡',
    Otros: '📦',
  };
  return map[category] ?? '💸';
}