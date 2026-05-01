'use client';

import { useEffect } from 'react';
import { useExpenseStore } from '../../store/expenseStore';
import { useFilteredExpenses } from '../../hooks/useFilteredExpenses';
import { ExpensesTable } from '../../components/expenses/ExpensesTable';
import { ExpenseFilters } from '../../components/expenses/ExpenseFilters';
import { Button } from '../../components/ui/Button';

export default function ExpensesPage() {
  const { loadExpenses, openModal, loading, error, expenses } = useExpenseStore();
  const filtered = useFilteredExpenses();

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
          <Button onClick={loadExpenses} variant="secondary" size="sm" className="mt-3">Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} de {expenses.length} gastos</p>
        </div>
        <Button onClick={() => openModal()} size="md">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo gasto
        </Button>
      </div>
      <ExpenseFilters />
      <ExpensesTable expenses={filtered} />
    </div>
  );
}