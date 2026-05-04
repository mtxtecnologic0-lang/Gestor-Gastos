export const CATEGORIES = [
  'Comida',
  'Transporte',
  'Entretenimiento',
  'Salud',
  'Compras',
  'Servicios',
  'Otros',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string; 
  createdAt: string;
}

export interface ExpenseFilters {
  category: Category | 'all';
  search: string;
  dateFrom: string;
  dateTo: string;
}

export interface DashboardMetrics {
  totalThisMonth: number;
  dailyAverage: number;
  topCategory: string;
  transactionCount: number;
}
