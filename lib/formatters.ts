import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Expense, DashboardMetrics, Category } from '@/types/expense';
import { getDaysInMonth } from 'date-fns';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "d 'de' MMMM, yyyy", { locale: es });
  } catch {
    return dateStr;
  }
}

export function formatShortDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'dd/MM/yyyy');
  } catch {
    return dateStr;
  }
}

export function getThisMonthExpenses(expenses: Expense[]): Expense[] {
  const now = new Date();
  return expenses.filter((e) => {
    const d = parseISO(e.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
}

export function getDashboardMetrics(expenses: Expense[]): DashboardMetrics {
  const monthExpenses = getThisMonthExpenses(expenses);
  const totalThisMonth = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

  const now = new Date();
  const daysInMonth = getDaysInMonth(now);
  const dailyAverage = daysInMonth > 0 ? totalThisMonth / daysInMonth : 0;

  const categoryTotals = monthExpenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  return {
    totalThisMonth,
    dailyAverage,
    topCategory,
    transactionCount: monthExpenses.length,
  };
}

export function getExpensesByCategory(expenses: Expense[]): { name: string; value: number }[] {
  const monthExpenses = getThisMonthExpenses(expenses);
  const totals = monthExpenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount;
    return acc;
  }, {});
  return Object.entries(totals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getExpensesByDay(expenses: Expense[]): { day: string; total: number }[] {
  const monthExpenses = getThisMonthExpenses(expenses);
  const totals = monthExpenses.reduce<Record<string, number>>((acc, e) => {
    const day = format(parseISO(e.date), 'dd');
    acc[day] = (acc[day] ?? 0) + e.amount;
    return acc;
  }, {});
  return Object.entries(totals)
    .map(([day, total]) => ({ day, total }))
    .sort((a, b) => Number(a.day) - Number(b.day));
}

export const CATEGORY_COLORS: Record<Category, string> = {
  Comida: '#f97316',
  Transporte: '#3b82f6',
  Entretenimiento: '#a855f7',
  Salud: '#22c55e',
  Compras: '#ec4899',
  Servicios: '#eab308',
  Otros: '#94a3b8',
};