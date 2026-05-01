'use client';

import { useCallback, useState } from 'react';
import { useExpenseStore } from '../../store/expenseStore';
import { CATEGORIES } from '../../types/expense';

export function ExpenseFilters() {
  const { filters, setFilters } = useExpenseStore();
  const [localSearch, setLocalSearch] = useState(filters.search);

  // Debounce search
  const handleSearch = useCallback(
    (value: string) => {
      setLocalSearch(value);
      const timer = setTimeout(() => setFilters({ search: value }), 300);
      return () => clearTimeout(timer);
    },
    [setFilters]
  );

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Buscar gasto..."
          value={localSearch}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
        />
      </div>

      {/* Category filter */}
      <select
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value as typeof filters.category })}
        className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition appearance-none min-w-[140px]"
      >
        <option value="all">Categoría</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Date range */}
      <input
        type="date"
        value={filters.dateFrom}
        onChange={(e) => setFilters({ dateFrom: e.target.value })}
        className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
        title="Desde"
      />
      <input
        type="date"
        value={filters.dateTo}
        onChange={(e) => setFilters({ dateTo: e.target.value })}
        className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
        title="Hasta"
      />
    </div>
  );
}