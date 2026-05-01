import { Expense } from '../types/expense';

const STORAGE_KEY = 'expense_tracker_data';

function safeGetExpenses(): Expense[] {
  try {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Expense[];
  } catch {
    return [];
  }
}

function safeSaveExpenses(expenses: Expense[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (err) {
    console.error('Failed to save expenses:', err);
  }
}

export function getExpenses(): Expense[] {
  return safeGetExpenses();
}

export function addExpense(expense: Omit<Expense, 'id' | 'createdAt'>): Expense {
  const expenses = safeGetExpenses();
  const newExpense: Expense = {
    ...expense,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  safeSaveExpenses([...expenses, newExpense]);
  return newExpense;
}

export function updateExpense(id: string, updates: Omit<Expense, 'id' | 'createdAt'>): Expense | null {
  const expenses = safeGetExpenses();
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) return null;
  const updated = { ...expenses[index], ...updates };
  const newExpenses = [...expenses];
  newExpenses[index] = updated;
  safeSaveExpenses(newExpenses);
  return updated;
}

export function deleteExpense(id: string): boolean {
  const expenses = safeGetExpenses();
  const filtered = expenses.filter((e) => e.id !== id);
  if (filtered.length === expenses.length) return false;
  safeSaveExpenses(filtered);
  return true;
}

export function seedDemoData(): void {
  const existing = safeGetExpenses();
  if (existing.length > 0) return;

  const now = new Date();
  const demo: Omit<Expense, 'id' | 'createdAt'>[] = [
    { description: 'Almuerzo restaurante', amount: 45000, category: 'Comida', date: new Date(now.getFullYear(), now.getMonth(), 2).toISOString() },
    { description: 'Bus mensual', amount: 120000, category: 'Transporte', date: new Date(now.getFullYear(), now.getMonth(), 1).toISOString() },
    { description: 'Netflix', amount: 17900, category: 'Entretenimiento', date: new Date(now.getFullYear(), now.getMonth(), 1).toISOString() },
    { description: 'Mercado semanal', amount: 180000, category: 'Comida', date: new Date(now.getFullYear(), now.getMonth(), 5).toISOString() },
    { description: 'Consulta médica', amount: 65000, category: 'Salud', date: new Date(now.getFullYear(), now.getMonth(), 8).toISOString() },
    { description: 'Ropa deportiva', amount: 220000, category: 'Compras', date: new Date(now.getFullYear(), now.getMonth(), 10).toISOString() },
    { description: 'Agua y luz', amount: 95000, category: 'Servicios', date: new Date(now.getFullYear(), now.getMonth(), 3).toISOString() },
    { description: 'Cena cumpleaños', amount: 85000, category: 'Comida', date: new Date(now.getFullYear(), now.getMonth(), 15).toISOString() },
    { description: 'Taxi aeropuerto', amount: 55000, category: 'Transporte', date: new Date(now.getFullYear(), now.getMonth(), 12).toISOString() },
    { description: 'Spotify', amount: 9900, category: 'Entretenimiento', date: new Date(now.getFullYear(), now.getMonth(), 1).toISOString() },
    { description: 'Medicamentos', amount: 32000, category: 'Salud', date: new Date(now.getFullYear(), now.getMonth(), 18).toISOString() },
    { description: 'Internet hogar', amount: 79900, category: 'Servicios', date: new Date(now.getFullYear(), now.getMonth(), 5).toISOString() },
  ];

  const seeded: Expense[] = demo.map((d) => ({
    ...d,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }));

  safeSaveExpenses(seeded);
}