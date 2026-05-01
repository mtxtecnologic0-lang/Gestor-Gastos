import { useMemo } from 'react';
import { useExpenseStore } from '../store/expenseStore';
import { parseISO } from 'date-fns';

const CURRENT_YEAR = new Date().getFullYear();
const MAX_RESULTS = 20;

export function useFilteredExpenses() {
  const { expenses, filters } = useExpenseStore();

  const filtered = useMemo(() => {
    return expenses
      .filter((e) => {
        const date = parseISO(e.date);
        if (date.getFullYear() !== CURRENT_YEAR) return false;
        if (filters.category !== 'all' && e.category !== filters.category) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          if (!e.description.toLowerCase().includes(q)) return false;
        }
        if (filters.dateFrom && e.date < filters.dateFrom) return false;
        if (filters.dateTo && e.date > filters.dateTo) return false;
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, MAX_RESULTS);
  }, [expenses, filters]);

  return filtered;
}