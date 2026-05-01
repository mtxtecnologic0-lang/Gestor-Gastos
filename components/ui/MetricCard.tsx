import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
}

export function MetricCard({ label, value, subtitle, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      {icon && (
        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center mb-3 text-gray-500">
          {icon}
        </div>
      )}
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}