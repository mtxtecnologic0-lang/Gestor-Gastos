'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { CATEGORY_COLORS, formatCurrency } from '@/lib/formatters';
import { Category } from '@/types/expense';

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3">
        <p className="text-xs text-gray-500 mb-1">Día {label}</p>
        <p className="text-sm font-semibold text-gray-900">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
}

export function SpendingByDayChart({ data }: { data: { day: string; total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={36} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
        <Bar dataKey="total" fill="#1f2937" radius={[6, 6, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SpendingByCategoryChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
          {data.map((entry) => (
            <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name as Category] ?? '#94a3b8'} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Gasto']} contentStyle={{ borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: 12 }} />
        <Legend iconType="circle" iconSize={8} formatter={(value) => <span style={{ fontSize: 11, color: '#6b7280' }}>{value}</span>} />
      </PieChart>
    </ResponsiveContainer>
  );
}