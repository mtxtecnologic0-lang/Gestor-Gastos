import { create } from 'zustand';
import { Expense, ExpenseFilters } from '../types/expense';
import * as expenseService from '../services/expenseService';

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  filters: ExpenseFilters;
  isModalOpen: boolean;
  editingExpense: Expense | null;

  loadExpenses: () => void;
  addExpense: (data: Omit<Expense, 'id' | 'createdAt'>) => void;
  updateExpense: (id: string, data: Omit<Expense, 'id' | 'createdAt'>) => void;
  deleteExpense: (id: string) => void;
  setFilters: (filters: Partial<ExpenseFilters>) => void;
  openModal: (expense?: Expense) => void;
  closeModal: () => void;
}

const DEFAULT_FILTERS: ExpenseFilters = {
  category: 'all',
  search: '',
  dateFrom: '',
  dateTo: '',
};

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
  loading: false,
  error: null,
  filters: DEFAULT_FILTERS,
  isModalOpen: false,
  editingExpense: null,

  loadExpenses: () => {
    set({ loading: true, error: null });
    try {
      expenseService.seedDemoData();
      const data = expenseService.getExpenses();
      set({ expenses: data, loading: false });
    } catch {
      set({ error: 'Error al cargar los gastos', loading: false });
    }
  },

  addExpense: (data) => {
    const newExpense = expenseService.addExpense(data);
    set((state) => ({ expenses: [...state.expenses, newExpense] }));
  },

  updateExpense: (id, data) => {
    const updated = expenseService.updateExpense(id, data);
    if (!updated) return;
    set((state) => ({
      expenses: state.expenses.map((e) => (e.id === id ? updated : e)),
    }));
  },

  deleteExpense: (id) => {
    expenseService.deleteExpense(id);
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    }));
  },

  setFilters: (filters) => {
    set((state) => ({ filters: { ...state.filters, ...filters } }));
  },

  openModal: (expense) => {
    set({ isModalOpen: true, editingExpense: expense ?? null });
  },

  closeModal: () => {
    set({ isModalOpen: false, editingExpense: null });
  },
}));