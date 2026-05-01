import { z } from 'zod';
import { CATEGORIES } from '../types/expense';

export const expenseSchema = z.object({
  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .max(100, 'Máximo 100 caracteres'),
  amount: z
    .number({ error: 'Ingresa un monto válido' })
    .positive('El monto debe ser mayor a 0'),
  category: z.enum(CATEGORIES, { error: 'Selecciona una categoría' }),
  date: z.string().min(1, 'La fecha es requerida'),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;