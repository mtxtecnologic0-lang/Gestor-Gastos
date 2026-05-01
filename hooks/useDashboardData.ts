import { useMemo } from 'react';
import { useExpenseStore } from '../store/expenseStore';
import { getDashboardMetrics, getExpensesByCategory, getExpensesByDay, getThisMonthExpenses } from '@/lib/formatters';

export function useDashboardData() {
  const { expenses } = useExpenseStore();

  const metrics = useMemo(() => getDashboardMetrics(expenses), [expenses]);
  const byCategory = useMemo(() => getExpensesByCategory(expenses), [expenses]);
  const byDay = useMemo(() => getExpensesByDay(expenses), [expenses]);
  const recentExpenses = useMemo(
    () =>
      getThisMonthExpenses(expenses)
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5),
    [expenses]
  );

  return { metrics, byCategory, byDay, recentExpenses };
}